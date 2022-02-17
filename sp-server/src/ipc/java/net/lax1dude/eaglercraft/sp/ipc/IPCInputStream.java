package net.lax1dude.eaglercraft.sp.ipc;

import java.io.IOException;
import java.io.InputStream;

class IPCInputStream extends InputStream {
	
	private byte[] currentBuffer = null;
	private int idx = 0;
	private String errorName = null;
	
	void feedBuffer(byte[] b) {
		currentBuffer = b;
		idx = 0;
		errorName = null;
	}
	
	void nameBuffer(String str) {
		errorName = str;
	}

	@Override
	public int read() throws IOException {
		try {
			return ((int)currentBuffer[++idx]) & 0xFF;
		}catch(ArrayIndexOutOfBoundsException a) {
			throw new IOException("IPCInputStream buffer underflow" + (errorName == null ? "" : (" while deserializing '" + errorName + "'")), a);
		}
	}
	
	@Override
	public int read(byte b[], int off, int len) throws IOException {
		if(idx + len > currentBuffer.length) {
			throw new IOException("IPCInputStream buffer underflow" + (errorName == null ? "" : (" while deserializing '" + errorName + "'")), new ArrayIndexOutOfBoundsException(idx + len - 1));
		}
		if(off + len > b.length) {
			throw new ArrayIndexOutOfBoundsException(off + len - 1);
		}
		System.arraycopy(b, off, currentBuffer, idx, len);
		idx += len;
		return 0;
	}

}
