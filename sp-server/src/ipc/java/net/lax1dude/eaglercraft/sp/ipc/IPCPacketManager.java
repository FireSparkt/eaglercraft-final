package net.lax1dude.eaglercraft.sp.ipc;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.util.HashMap;

public class IPCPacketManager {
	
	public static final HashMap<Integer, Class<? extends IPCPacketBase>> mappings = new HashMap();

	public static final IPCInputStream IPC_INPUT_STREAM = new IPCInputStream();
	public static final IPCOutputStream IPC_OUTPUT_STREAM = new IPCOutputStream();

	public static final DataInputStream IPC_DATA_INPUT_STREAM = new DataInputStream(IPC_INPUT_STREAM);
	public static final DataOutputStream IPC_DATA_OUTPUT_STREAM = new DataOutputStream(IPC_OUTPUT_STREAM);
	
	static {
		mappings.put(IPCPacket00StartServer.ID, IPCPacket00StartServer.class);
		mappings.put(IPCPacket01StopServer.ID, IPCPacket01StopServer.class);
		mappings.put(IPCPacket02InitWorld.ID, IPCPacket02InitWorld.class);
		mappings.put(IPCPacket03DeleteWorld.ID, IPCPacket03DeleteWorld.class);
		mappings.put(IPCPacket04RenameWorld.ID, IPCPacket04RenameWorld.class);
		mappings.put(IPCPacket05RequestData.ID, IPCPacket05RequestData.class);
		mappings.put(IPCPacket06RenameWorldNBT.ID, IPCPacket06RenameWorldNBT.class);
		mappings.put(IPCPacket07ImportWorld.ID, IPCPacket07ImportWorld.class);
		mappings.put(IPCPacket09RequestResponse.ID, IPCPacket09RequestResponse.class);
		mappings.put(IPCPacket0ASetWorldDifficulty.ID, IPCPacket0ASetWorldDifficulty.class);
		mappings.put(IPCPacket0BPause.ID, IPCPacket0BPause.class);
		mappings.put(IPCPacket0CPlayerChannel.ID, IPCPacket0CPlayerChannel.class);
		mappings.put(IPCPacket0DProgressUpdate.ID, IPCPacket0DProgressUpdate.class);
		mappings.put(IPCPacket0EListWorlds.ID, IPCPacket0EListWorlds.class);
		mappings.put(IPCPacket0FListFiles.ID, IPCPacket0FListFiles.class);
		mappings.put(IPCPacket10FileRead.ID, IPCPacket10FileRead.class);
		mappings.put(IPCPacket12FileWrite.ID, IPCPacket12FileWrite.class);
		mappings.put(IPCPacket13FileCopyMove.ID, IPCPacket13FileCopyMove.class);
		mappings.put(IPCPacket14StringList.ID, IPCPacket14StringList.class);
		mappings.put(IPCPacket15ThrowException.ID, IPCPacket15ThrowException.class);
		mappings.put(IPCPacket16NBTList.ID, IPCPacket16NBTList.class);
		mappings.put(IPCPacketFFProcessKeepAlive.ID, IPCPacketFFProcessKeepAlive.class);
	}
	
	public static byte[] IPCSerialize(IPCPacketBase pkt) throws IOException {
		
		IPC_OUTPUT_STREAM.feedBuffer(new byte[pkt.size() + 1], pkt.getClass().getSimpleName());
		IPC_OUTPUT_STREAM.write(pkt.id());
		pkt.serialize(IPC_DATA_OUTPUT_STREAM);
		
		return IPC_OUTPUT_STREAM.returnBuffer();
	}
	
	public static IPCPacketBase IPCDeserialize(byte[] pkt) throws IOException {
		
		IPC_INPUT_STREAM.feedBuffer(pkt);
		int i = IPC_INPUT_STREAM.read();
		
		Class<? extends IPCPacketBase> pk = mappings.get(Integer.valueOf(i));
		if(pk == null) {
			throw new IOException("Packet type 0x" + Integer.toHexString(i) + " doesn't exist");
		}
		
		IPCPacketBase p;
		try {
			p = pk.newInstance();
		} catch (InstantiationException | IllegalAccessException | IllegalArgumentException | SecurityException e) {
			throw new RuntimeException("Packet type 0x" + Integer.toHexString(i) + " class '" + pk.getSimpleName() + "' could not be constructed", e);
		}
		
		IPC_INPUT_STREAM.nameBuffer(pk.getSimpleName());
		
		p.deserialize(IPC_DATA_INPUT_STREAM);
		
		int lo = IPC_INPUT_STREAM.getLeftoverCount();
		if(lo > 0) {
			System.err.println("Packet type 0x" + Integer.toHexString(i) + " class '" + pk.getSimpleName() + "' was size " + (pkt.length - 1) + " but only " + (pkt.length - 1 - lo) + " bytes were read");
		}
		
		return p;
	}
	
}
