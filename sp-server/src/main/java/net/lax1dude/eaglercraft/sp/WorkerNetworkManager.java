package net.lax1dude.eaglercraft.sp;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.util.LinkedList;

import net.lax1dude.eaglercraft.sp.ipc.IPCInputStream;
import net.lax1dude.eaglercraft.sp.ipc.IPCOutputStream;
import net.lax1dude.eaglercraft.sp.ipc.IPCPacket0CPlayerChannel;
import net.minecraft.server.MinecraftServer;
import net.minecraft.src.INetworkManager;
import net.minecraft.src.NetHandler;
import net.minecraft.src.NetLoginHandler;
import net.minecraft.src.Packet;

public class WorkerNetworkManager implements INetworkManager {

	public static final IPCInputStream NET_INPUT_STREAM = new IPCInputStream();
	public static final IPCOutputStream NET_OUTPUT_STREAM = new IPCOutputStream();

	public static final DataInputStream NET_DATA_INPUT_STREAM = new DataInputStream(NET_INPUT_STREAM);
	public static final DataOutputStream NET_DATA_OUTPUT_STREAM = new DataOutputStream(NET_OUTPUT_STREAM);
	
	private NetHandler theNetHandler;
	private String ipcChannel;
	private boolean isAlive;
	private WorkerListenThread listenThread;
	
	private LinkedList<byte[]> frags = new LinkedList();
	
	public WorkerNetworkManager(String ipcChannel, MinecraftServer srv, WorkerListenThread th) {
		this.ipcChannel = ipcChannel;
		this.theNetHandler = new NetLoginHandler(srv, this);
		this.isAlive = true;
		this.listenThread = th;
	}

	@Override
	public void setNetHandler(NetHandler var1) {
		theNetHandler = var1;
	}

	@Override
	public void addToSendQueue(Packet var1) {
		if(!isAlive) {
			return;
		}
		NET_OUTPUT_STREAM.feedBuffer(new byte[var1.getPacketSize() + 1], "[MC]" + var1.getClass().getSimpleName());
		try {
			Packet.writePacket(var1, NET_DATA_OUTPUT_STREAM);
		}catch(IOException e) {
			System.err.println("Failed to serialize minecraft packet '" + var1.getPacketId() + "' for IPC channel 'NET|" + ipcChannel + "'");
			e.printStackTrace();
		}
		IntegratedServer.sendPlayerPacket(ipcChannel, NET_OUTPUT_STREAM.returnBuffer());
	}
	
	public void addToRecieveQueue(byte[] fragment) {
		if(!isAlive) {
			return;
		}
		frags.add(fragment);
	}

	@Override
	public void wakeThreads() {
		// no
	}

	@Override
	public void processReadPackets() {
		if(!isAlive) {
			return;
		}
		if(frags.size() <= 0) {
			return;
		}
		
		int blockSize = 0;
		for(byte[] pkt : frags) {
			blockSize += pkt.length;
		}

		int idx = 0;
		byte[] block = new byte[blockSize];
		for(byte[] pkt : frags) {
			System.arraycopy(pkt, 0, block, idx, pkt.length);
			idx += pkt.length;
		}
		
		LinkedList<Packet> readPackets = new LinkedList();
		
		NET_INPUT_STREAM.feedBuffer(block);
		
		while(true) {
			try {
				int pktId = NET_INPUT_STREAM.read();
				
				if(pktId == -1) {
					System.err.println("Recieved invalid '-1' packet");
					NET_INPUT_STREAM.markIndex();
					break;
				}
				
				Packet pkt = Packet.getNewPacket(IntegratedServer.logger, idx);
				
				if(pkt == null) {
					NET_INPUT_STREAM.markIndex();
					break;
				}
				
				pkt.field_98193_m = IntegratedServer.logger;
				pkt.readPacketData(NET_DATA_INPUT_STREAM);
				
				readPackets.add(pkt);
				
				NET_INPUT_STREAM.markIndex();
				
			}catch(IOException ex) {
				// end
				break;
			}
		}
		
		NET_INPUT_STREAM.rewindIndex();
		
		frags.clear();
		frags.add(NET_INPUT_STREAM.getLeftover());
		
		for(Packet p : readPackets) {
			try {
				p.processPacket(theNetHandler);
			}catch(Throwable t) {
				System.err.println("Could not process minecraft packet 0x" + Integer.toHexString(p.getPacketId()) + " class '" + p.getClass().getSimpleName() + "' on channel 'NET|" + ipcChannel + "'");
				t.printStackTrace();
			}
		}
		
	}

	@Override
	public void serverShutdown() {
		if(isAlive) {
			listenThread.closeChannel(ipcChannel);
			IntegratedServer.sendIPCPacket(new IPCPacket0CPlayerChannel(ipcChannel, false));
		}
		isAlive = false;
	}

	@Override
	public int getNumChunkDataPackets() { // why is this a thing, it limits map (the item) updates
		return 0;
	}

	@Override
	public void networkShutdown(String var1, Object... var2) {
		if(isAlive) {
			listenThread.closeChannel(ipcChannel);
			IntegratedServer.sendIPCPacket(new IPCPacket0CPlayerChannel(ipcChannel, false));
		}
		isAlive = false;
	}

}
