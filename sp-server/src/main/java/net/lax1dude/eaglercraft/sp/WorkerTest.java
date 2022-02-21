package net.lax1dude.eaglercraft.sp;

import java.io.IOException;
import java.util.LinkedList;

import org.teavm.jso.JSBody;
import org.teavm.jso.JSFunctor;
import org.teavm.jso.JSObject;
import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.events.ErrorEvent;
import org.teavm.jso.dom.events.EventListener;
import org.teavm.jso.dom.html.HTMLDocument;
import org.teavm.jso.typedarrays.ArrayBuffer;
import org.teavm.jso.typedarrays.Uint8Array;
import org.teavm.jso.workers.Worker;

import net.lax1dude.eaglercraft.sp.ipc.*;

public class WorkerTest {
	
	private static final LinkedList<PKT> messageQueue = new LinkedList();
	private static boolean isAlive = false;
	private static boolean isLoading = false;
	
	protected static class PKT {
		protected final String channel;
		protected final byte[] data;
		protected PKT(String channel, byte[] data) {
			this.channel = channel;
			this.data = data;
		}
	}
	
	public static Worker server = null;
	
	@JSFunctor
	private static interface WorkerBinaryPacketHandler extends JSObject {
		public void onMessage(String channel, ArrayBuffer buf);
	}
	
	private static class WorkerBinaryPacketHandlerImpl implements WorkerBinaryPacketHandler {
		
		public void onMessage(String channel, ArrayBuffer buf) {
			if(channel == null) {
				System.err.println("Recieved IPC packet with null channel");
				return;
			}
			
			if(buf == null) {
				System.err.println("Recieved IPC packet with null buffer");
				return;
			}
			
			Uint8Array a = Uint8Array.create(buf);
			byte[] pkt = new byte[a.getLength()];
			for(int i = 0; i < pkt.length; ++i) {
				pkt[i] = (byte) a.get(i);
			}
			
			messageQueue.add(new PKT(channel, pkt));
		}
		
	}
	
	@JSBody(params = { "w", "wb" }, script = "w.onmessage = function(o) { wb(o.data.ch, o.data.dat); };")
	private static native void registerPacketHandler(Worker w, WorkerBinaryPacketHandler wb);
	
	@JSBody(params = { "w", "ch", "dat" }, script = "w.postMessage({ ch: ch, dat : dat });")
	private static native void sendWorkerPacket(Worker w, String channel, ArrayBuffer arr);
	
	public static void sendIPCPacket(IPCPacketBase pkt) {
		byte[] serialized;
		
		try {
			serialized = IPCPacketManager.IPCSerialize(pkt);
		} catch (IOException e) {
			System.err.println("Could not serialize IPC packet 0x" + Integer.toHexString(pkt.id()) + " class '" + pkt.getClass().getSimpleName() + "'");
			e.printStackTrace();
			return;
		}
		
		ArrayBuffer arb = ArrayBuffer.create(serialized.length);
		Uint8Array ar = Uint8Array.create(arb);
		ar.set(serialized);
		sendWorkerPacket(server, "IPC", arb);
	}
	
	public static void init(String path) {
		server = Worker.create(path);
		server.onError(new EventListener<ErrorEvent>() {
			@Override
			public void handleEvent(ErrorEvent evt) {
				System.err.println("Worker Error: " + evt.getError());
			}
		});
		registerPacketHandler(server, new WorkerBinaryPacketHandlerImpl());
		
		while(true) {
			
			while(messageQueue.size() > 0) {
				PKT p = messageQueue.remove(0);
				if(p.channel.equals("IPC")) {
					
					IPCPacketBase packet;
					try {
						packet = IPCPacketManager.IPCDeserialize(p.data);
					}catch(IOException e) {
						System.err.print("Failed to deserialize IPC packet: ");
						e.printStackTrace();
						return;
					}
					
					int id = packet.id();
					
					try {
						switch(id) {
						case IPCPacketFFProcessKeepAlive.ID: {
								isAlive = true;
							}
							break;
						case IPCPacket15ThrowException.ID: {
								IPCPacket15ThrowException pkt = (IPCPacket15ThrowException)packet;
								System.err.println("Server Exception: " + pkt.errorMessage);
								for(String s : pkt.stackTrace) {
									System.err.println("    " + s);
								}
							}
							break;
						case IPCPacket0DProgressUpdate.ID: {
								IPCPacket0DProgressUpdate pkt = (IPCPacket0DProgressUpdate)packet;
								System.out.println("Progress: " + pkt.updateMessage + " (" + (int)(100 * pkt.updateProgress) + "/100)");
							}
							break;
						default:
							System.err.println("IPC packet type 0x" + Integer.toHexString(id) + " class '" + packet.getClass().getSimpleName() + "' was not handled");
							break;
						}
					}catch(Throwable t) {
						System.err.println("fuck");
						t.printStackTrace();
					}
				}
				
			}
			
			if(isAlive && !isLoading) {
				isLoading = true;
				
				HTMLDocument doc = Window.current().getDocument();
				String[] stat = doc.getElementById("str_STAT_GUID").getInnerText().split("\n");
				String[] lang = doc.getElementById("str_LOCALE").getInnerText().split("\n");

				sendIPCPacket(new IPCPacket14StringList(IPCPacket14StringList.STAT_GUID, stat));
				sendIPCPacket(new IPCPacket14StringList(IPCPacket14StringList.LOCALE, lang));
				
				sendIPCPacket(new IPCPacket02InitWorld("eagler", 1, 0, "", 6969696969696969l, true, true, true));
				sendIPCPacket(new IPCPacket00StartServer("eagler", "LAX1DUDE", 0));
			}
			
			try {
				Thread.sleep(1l); // allow some async to occur
			}catch(InterruptedException e) {
				System.err.println("you eagler");
			}
		}
		
	}

}
