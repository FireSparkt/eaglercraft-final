package net.lax1dude.eaglercraft.sp;

import java.io.IOException;
import java.util.LinkedList;

import org.teavm.jso.JSBody;
import org.teavm.jso.JSFunctor;
import org.teavm.jso.typedarrays.ArrayBuffer;
import org.teavm.jso.typedarrays.Uint8Array;

import net.lax1dude.eaglercraft.sp.ipc.*;

public class IntegratedServer {
	
	private static final LinkedList<PKT> messageQueue = new LinkedList();
	
	protected static class PKT {
		protected final String channel;
		protected final byte[] data;
		protected PKT(String channel, byte[] data) {
			this.channel = channel;
			this.data = data;
		}
	}
	
	@JSFunctor
	private static class WorkerBinaryPacketHandler {
		
		@SuppressWarnings("unused")
		private void onMessage(String channel, ArrayBuffer buf) {
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
			for(int i = 0; i < a.getLength(); ++i) {
				pkt[i] = (byte) a.get(i);
			}
			
			messageQueue.add(new PKT(channel, pkt));
		}
		
	}
	
	private static void processAsyncMessageQueue() {
		while(messageQueue.size() > 0) {
			PKT msg = messageQueue.remove(0);
			
			if(msg.channel.equals("IPC")) {
				
				IPCPacketBase packet;
				try {
					packet = IPCPacketManager.IPCDeserialize(msg.data);
				}catch(IOException e) {
					System.err.print("Failed to deserialize IPC packet: ");
					e.printStackTrace();
					return;
				}
				
				int id = packet.id();
				switch(id) {
				case IPCPacket00StartServer.ID:
					
					break;
				case IPCPacket01StopServer.ID:
					
					break;
				case IPCPacket02InitWorld.ID:
					
					break;
				case IPCPacket03DeleteWorld.ID:
					
					break;
				case IPCPacket04RenameWorld.ID:
					
					break;
				case IPCPacket05RequestData.ID:
					
					break;
				case IPCPacket07ImportWorld.ID:
					
					break;
				case IPCPacket09RequestResponse.ID:
					
					break;
				case IPCPacket0ASetWorldDifficulty.ID:
					
					break;
				case IPCPacket0BPause.ID:
					
					break;
				case IPCPacket0CPlayerChannel.ID:
					
					break;
				case IPCPacket0EListWorlds.ID:
					
					break;
				case IPCPacket0FListFiles.ID:
					
					break;
				case IPCPacket10FileRead.ID:
					
					break;
				case IPCPacket12FileWrite.ID:
					
					break;
				case IPCPacket13FileCopyMove.ID:
					
					break;
				case IPCPacket14StringList.ID:
					
					break;
				default:
					System.err.println("IPC packet type 0x" + Integer.toHexString(id) + " class '" + packet.getClass().getSimpleName() + "' was not handled");
					break;
				}
				
				return;
			}
				
			System.err.println("Unknown IPC channel: " + msg.channel);
		}
	}
	
	private static boolean isRunning = false;
	
	public static void halt() {
		isRunning = false;
	}
	
	private static void mainLoop() {
		processAsyncMessageQueue();
	}
	
	@JSBody(params = { "wb" }, script = "onmessage = function(o) { wb(o.ch, o.dat); };")
	private static native void registerPacketHandler(WorkerBinaryPacketHandler wb);
	
	public static void main(String[] args) {
		
		registerPacketHandler(new WorkerBinaryPacketHandler());
		
		isRunning = true;
		
		while(isRunning) {
			
			mainLoop();
			
			try {
				Thread.sleep(1l); // allow some async to occur
			}catch(InterruptedException e) {
				System.err.println("you eagler");
			}
		}
		
		// yee
	}

}
