package net.lax1dude.eaglercraft.sp.ipc;

import java.io.DataInput;
import java.io.DataOutput;
import java.io.IOException;

public interface IPCPacketBase {

	public void deserialize(DataInput bin) throws IOException;
	public void serialize(DataOutput bin) throws IOException;
	public int id();
	public int size();
	
	public static int strLen(String s) {
		int count = 0;
		for (int i = 0, len = s.length(); i < len; i++) {
			char ch = s.charAt(i);
			if (ch <= 0x7F) {
				count++;
			} else if (ch <= 0x7FF) {
				count += 2;
			} else if (Character.isHighSurrogate(ch)) {
				count += 4;
				++i;
			} else {
				count += 3;
			}
		}
		return count + 2;
	}
	
}
