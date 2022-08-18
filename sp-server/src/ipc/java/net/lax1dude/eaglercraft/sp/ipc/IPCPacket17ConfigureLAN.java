package net.lax1dude.eaglercraft.sp.ipc;

import java.io.DataInput;
import java.io.DataOutput;
import java.io.IOException;

public class IPCPacket17ConfigureLAN implements IPCPacketBase {
	
	public static final int ID = 0x17;
	
	public int gamemode;
	public boolean cheats;
	
	public IPCPacket17ConfigureLAN() {
	}
	
	public IPCPacket17ConfigureLAN(int gamemode, boolean cheats) {
		this.gamemode = gamemode;
		this.cheats = cheats;
	}

	@Override
	public void deserialize(DataInput bin) throws IOException {
		gamemode = bin.readUnsignedByte();
		cheats = bin.readBoolean();
	}

	@Override
	public void serialize(DataOutput bin) throws IOException {
		bin.writeByte(gamemode);
		bin.writeBoolean(cheats);
	}

	@Override
	public int id() {
		return ID;
	}

	@Override
	public int size() {
		return 2;
	}

}
