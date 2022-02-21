package net.lax1dude.eaglercraft.sp;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import net.minecraft.server.MinecraftServer;
import net.minecraft.src.NetServerHandler;

public class WorkerListenThread {
	/** Reference to the MinecraftServer object. */
	private final MinecraftServer mcServer;
	private final List connections = new ArrayList();
	private final HashMap<String, WorkerNetworkManager> channels = new HashMap();

	/** Whether the network listener object is listening. */
	public volatile boolean isListening = false;

	public WorkerListenThread(MinecraftServer par1MinecraftServer) {
		this.mcServer = par1MinecraftServer;
		this.isListening = true;
	}

	/**
	 * adds this connection to the list of currently connected players
	 */
	public void addPlayer(NetServerHandler par1NetServerHandler) {
		this.connections.add(par1NetServerHandler);
	}

	public void stopListening() {
		this.isListening = false;
	}
	
	public boolean openChannel(String player) {
		return channels.put(player, new WorkerNetworkManager(player, mcServer, this)) == null;
	}
	
	public void recievePacket(String player, byte[] data) {
		WorkerNetworkManager channel = channels.get(player);
		if(channel == null) {
			return;
		}
		channel.addToRecieveQueue(data);
	}
	
	public boolean closeChannel(String player) {
		WorkerNetworkManager channel = channels.get(player);
		if(channel == null) {
			return false;
		}
		channel.networkShutdown(null, null, null);
		channels.remove(player);
		return true;
	}

	/**
	 * Handles all incoming connections and packets
	 */
	public void handleNetworkListenThread() {
		for(WorkerNetworkManager mgr : channels.values()) {
			mgr.processReadPackets();
		}
		for (int var1 = 0; var1 < this.connections.size(); ++var1) {
			NetServerHandler var2 = (NetServerHandler) this.connections.get(var1);
			var2.handlePackets();
		}
	}

	public MinecraftServer getServer() {
		return this.mcServer;
	}
}
