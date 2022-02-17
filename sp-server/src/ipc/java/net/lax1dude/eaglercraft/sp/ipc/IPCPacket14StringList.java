package net.lax1dude.eaglercraft.sp.ipc;

import java.io.DataInput;
import java.io.DataOutput;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class IPCPacket14StringList implements IPCPacketBase {
	
	public static final int ID = 0x14;

	public final List<String> stringList;
	
	public IPCPacket14StringList() {
		stringList = new ArrayList();
	}
	
	public IPCPacket14StringList(String[] list) {
		stringList = Arrays.asList(list);
	}
	
	public IPCPacket14StringList(List<String> list) {
		stringList = list;
	}

	@Override
	public void deserialize(DataInput bin) throws IOException {
		stringList.clear();
		int len = bin.readInt();
		for(int i = 0; i < len; ++i) {
			stringList.add(bin.readUTF());
		}
	}

	@Override
	public void serialize(DataOutput bin) throws IOException {
		bin.writeInt(stringList.size());
		for(String str : stringList) {
			bin.writeUTF(str);
		}
	}

	@Override
	public int id() {
		return ID;
	}

	@Override
	public int size() {
		int len = 4;
		for(String str : stringList) {
			len += IPCPacketBase.strLen(str);
		}
		return len;
	}

}
