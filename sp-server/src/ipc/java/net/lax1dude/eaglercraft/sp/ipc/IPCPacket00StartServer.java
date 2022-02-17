package net.lax1dude.eaglercraft.sp.ipc;

import java.io.DataInput;
import java.io.DataOutput;
import java.io.IOException;

public class IPCPacket00StartServer implements IPCPacketBase {
	
	public static final int ID = 0x00;

	public String worldName;
	
	public IPCPacket00StartServer() {
	}
	
	public IPCPacket00StartServer(String worldName) {
		this.worldName = worldName;
	}

	@Override
	public void deserialize(DataInput bin) throws IOException {
		worldName = bin.readUTF();
	}

	@Override
	public void serialize(DataOutput bin) throws IOException {
		bin.writeUTF(worldName);
	}

	@Override
	public int id() {
		return ID;
	}

	@Override
	public int size() {
		return IPCPacketBase.strLen(worldName);
	}

}
