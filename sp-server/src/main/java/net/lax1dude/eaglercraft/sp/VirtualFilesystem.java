package net.lax1dude.eaglercraft.sp;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Iterator;

import org.teavm.interop.Async;
import org.teavm.interop.AsyncCallback;
import org.teavm.jso.JSBody;
import org.teavm.jso.JSObject;
import org.teavm.jso.dom.events.Event;
import org.teavm.jso.dom.events.EventListener;
import org.teavm.jso.indexeddb.EventHandler;
import org.teavm.jso.indexeddb.IDBCountRequest;
import org.teavm.jso.indexeddb.IDBDatabase;
import org.teavm.jso.indexeddb.IDBFactory;
import org.teavm.jso.indexeddb.IDBGetRequest;
import org.teavm.jso.indexeddb.IDBObjectStoreParameters;
import org.teavm.jso.indexeddb.IDBOpenDBRequest;
import org.teavm.jso.indexeddb.IDBRequest;
import org.teavm.jso.indexeddb.IDBTransaction;
import org.teavm.jso.indexeddb.IDBVersionChangeEvent;
import org.teavm.jso.typedarrays.ArrayBuffer;
import org.teavm.jso.typedarrays.Uint8Array;

public class VirtualFilesystem {
	
	protected static class VirtualOutputStream extends ByteArrayOutputStream {
		private final VFSFile file;
		
		protected VirtualOutputStream(VFSFile file) {
			this.file = file;
		}

		public void close() throws IOException {
			if(!file.setAllBytes(super.toByteArray(), false)) {
				throw new IOException("Could not close stream and write to \"" + file.filePath + "\" on VFS \"" + file.virtualFilesystem.database + "\" (the file was probably deleted)");
			}
		}
	}
	
	public static class VFSFile {

		public final VirtualFilesystem virtualFilesystem;
		protected boolean cacheEnabled;
		protected String filePath;
		protected int fileSize = -1;
		protected boolean hasBeenDeleted = false;
		protected boolean hasBeenAccessed = false;
		protected boolean exists = false;

		protected byte[] cache = null;
		protected long cacheHit;
		
		protected VFSFile(VirtualFilesystem vfs, String filePath, boolean cacheEnabled) {
			this.virtualFilesystem = vfs;
			this.filePath = filePath;
			this.cacheHit = System.currentTimeMillis();
			if(cacheEnabled) {
				setCacheEnabled();
			}
		}
		
		public boolean equals(Object o) {
			return (o instanceof VFSFile) && ((VFSFile)o).filePath.equals(filePath);
		}
		
		public int hashCode() {
			return filePath.hashCode();
		}
		
		public String getPath() {
			return filePath;
		}
		
		public int getSize() {
			cacheHit = System.currentTimeMillis();
			if(fileSize < 0) {
				if(cacheEnabled) {
					byte[] b = getAllBytes(false);
					if(b != null) {
						fileSize = b.length;
					}
				}else {
					ArrayBuffer dat = AsyncHandlers.readWholeFile(virtualFilesystem.indexeddb, filePath);
					if(dat != null) {
						fileSize = dat.getByteLength();
					}
				}
			}
			return fileSize;
		}
		
		public InputStream getInputStream() {
			byte[] dat = getAllBytes(false);
			if(dat == null) {
				return null;
			}
			return new ByteArrayInputStream(dat);
		}
		
		public OutputStream getOutputStream() {
			return new VirtualOutputStream(this);
		}
		
		public void getBytes(int fileOffset, byte[] array, int offset, int length) {
			if(hasBeenDeleted) {
				throw new ArrayIndexOutOfBoundsException("file '" + filePath + "' has been deleted");
			}else if(hasBeenAccessed && !exists) {
				throw new ArrayIndexOutOfBoundsException("file '" + filePath + "' does not exist");
			}
			cacheHit = System.currentTimeMillis();
			if(cacheEnabled && cache != null) {
				System.arraycopy(cache, fileOffset, array, offset, length);
			}else {
				ArrayBuffer aa = AsyncHandlers.readWholeFile(virtualFilesystem.indexeddb, filePath);
				hasBeenAccessed = true;
				if(aa != null) {
					exists = true;
				}else {
					exists = false;
					throw new ArrayIndexOutOfBoundsException("file '" + filePath + "' does not exist");
				}
				Uint8Array a = Uint8Array.create(aa);
				this.fileSize = a.getByteLength();
				if(cacheEnabled) {
					cache = new byte[fileSize];
					for(int i = 0; i < fileSize; ++i) {
						cache[i] = (byte)a.get(i);
					}
				}
				if(a.getLength() < fileOffset + length) {
					throw new ArrayIndexOutOfBoundsException("file '" + filePath + "' size was "+a.getLength()+" but user tried to read index "+(fileOffset + length - 1));
				}
				for(int i = 0; i < length; ++i) {
					array[i + offset] = (byte)a.get(i + fileOffset);
				}
			}
		}
		
		public void setCacheEnabled() {
			if(!cacheEnabled && !hasBeenDeleted && !(hasBeenAccessed && !exists)) {
				cacheHit = System.currentTimeMillis();
				cache = getAllBytes(false);
				cacheEnabled = true;
			}
		}
		
		public byte[] getAllBytes() {
			return getAllBytes(false);
		}
		
		public String getAllChars() {
			return utf8(getAllBytes(false));
		}
		
		public String[] getAllLines() {
			return lines(getAllChars());
		}
		
		public byte[] getAllBytes(boolean copy) {
			if(hasBeenDeleted || (hasBeenAccessed && !exists)) {
				return null;
			}
			cacheHit = System.currentTimeMillis();
			if(cacheEnabled && cache != null) {
				byte[] b = cache;
				if(copy) {
					b = new byte[cache.length];
					System.arraycopy(cache, 0, b, 0, cache.length);
				}
				return b;
			}else {
				hasBeenAccessed = true;
				ArrayBuffer b = AsyncHandlers.readWholeFile(virtualFilesystem.indexeddb, filePath);
				if(b != null) {
					exists = true;
				}else {
					exists = false;
					return null;
				}
				Uint8Array a = Uint8Array.create(b);
				this.fileSize = a.getByteLength();
				byte[] array = new byte[fileSize];
				for(int i = 0; i < a.getByteLength(); ++i) {
					array[i] = (byte)a.get(i);
				}
				if(cacheEnabled) {
					if(copy) {
						cache = new byte[fileSize];
						System.arraycopy(b, 0, cache, 0, cache.length);
					}else {
						cache = array;
					}
				}
				return array;
			}
		}
		
		public boolean setAllChars(String bytes) {
			return setAllBytes(utf8(bytes), true);
		}
		
		public boolean setAllBytes(byte[] bytes) {
			return setAllBytes(bytes, true);
		}
		
		public boolean setAllBytes(byte[] bytes, boolean copy) {
			if(hasBeenDeleted || bytes == null) {
				return false;
			}
			cacheHit = System.currentTimeMillis();
			this.fileSize = bytes.length;
			if(cacheEnabled) {
				byte[] copz = bytes;
				if(copy) {
					copz = new byte[bytes.length];
					System.arraycopy(bytes, 0, copz, 0, bytes.length);
				}
				cache = copz;
				return sync();
			}else {
				ArrayBuffer a = ArrayBuffer.create(bytes.length);
				Uint8Array ar = Uint8Array.create(a);
				ar.set(bytes);
				boolean s = AsyncHandlers.writeWholeFile(virtualFilesystem.indexeddb, filePath, a).bool;
				hasBeenAccessed = true;
				exists = exists || s;
				return s;
			}
		}
		
		public boolean sync() {
			if(cacheEnabled && cache != null && !hasBeenDeleted) {
				cacheHit = System.currentTimeMillis();
				ArrayBuffer a = ArrayBuffer.create(cache.length);
				Uint8Array ar = Uint8Array.create(a);
				ar.set(cache);
				boolean tryWrite = AsyncHandlers.writeWholeFile(virtualFilesystem.indexeddb, filePath, a).bool;
				hasBeenAccessed = true;
				exists = exists || tryWrite;
				return tryWrite;
			}
			return false;
		}
		
		public boolean delete() {
			if(!hasBeenDeleted && !(hasBeenAccessed && !exists)) {
				cacheHit = System.currentTimeMillis();
				if(!AsyncHandlers.deleteFile(virtualFilesystem.indexeddb, filePath).bool) {
					hasBeenAccessed = true;
					return false;
				}
				virtualFilesystem.fileMap.remove(filePath);
				hasBeenDeleted = true;
				hasBeenAccessed = true;
				exists = false;
				return true;
			}
			return false;
		}
		
		public boolean rename(String newName) {
			if(!hasBeenDeleted && !(hasBeenAccessed && !exists)) {
				cacheHit = System.currentTimeMillis();
				ArrayBuffer arr = AsyncHandlers.readWholeFile(virtualFilesystem.indexeddb, filePath);
				hasBeenAccessed = true;
				if(arr != null) {
					exists = true;
					if(!AsyncHandlers.writeWholeFile(virtualFilesystem.indexeddb, newName, arr).bool) {
						return false;
					}
					if(!AsyncHandlers.deleteFile(virtualFilesystem.indexeddb, filePath).bool) {
						return false;
					}
				}else {
					exists = false;
				}
				virtualFilesystem.fileMap.remove(filePath);
				filePath = newName;
				virtualFilesystem.fileMap.put(newName, this);
				return true;
			}
			return false;
		}
		
		public boolean exists() {
			if(hasBeenDeleted) {
				return false;
			}
			cacheHit = System.currentTimeMillis();
			if(hasBeenAccessed) {
				return exists;
			}
			exists = AsyncHandlers.fileExists(virtualFilesystem.indexeddb, filePath).bool;
			hasBeenAccessed = true;
			return exists;
		}
		
	}

	private final HashMap<String, VFSFile> fileMap = new HashMap();
	
	public final String database;
	private final IDBDatabase indexeddb;
	
	public static class VFSHandle {
		
		public final boolean failedInit;
		public final boolean failedLocked;
		public final String failedError;
		public final VirtualFilesystem vfs;
		
		public VFSHandle(boolean init, boolean locked, String error, VirtualFilesystem db) {
			failedInit = init;
			failedLocked = locked;
			failedError = error;
			vfs = db;
		}
		
		public String toString() {
			if(failedInit) {
				return "IDBFactory threw an exception, IndexedDB is most likely not supported in this browser." + (failedError == null ? "" : "\n\n" + failedError);
			}
			if(failedLocked) {
				return "The filesystem requested is already in use on a different tab.";
			}
			if(failedError != null) {
				return "The IDBFactory.open() request failed, reason: " + failedError;
			}
			return "Virtual Filesystem Object: " + vfs.database;
		}
		
	}
	
	public static VFSHandle openVFS(String db) {
		DatabaseOpen evt = AsyncHandlers.openDB(db);
		if(evt.failedInit) {
			return new VFSHandle(true, false, evt.failedError, null);
		}
		if(evt.failedLocked) {
			return new VFSHandle(false, true, null, null);
		}
		if(evt.failedError != null) {
			return new VFSHandle(false, false, evt.failedError, null);
		}
		return new VFSHandle(false, false, null, new VirtualFilesystem(db, evt.database));
	}
	
	private VirtualFilesystem(String db, IDBDatabase idb) {
		database = db;
		indexeddb = idb;
	}
	
	public void close() {
		indexeddb.close();
	}
	
	public VFSFile getFile(String path) {
		return getFile(path, false);
	}
	
	public VFSFile getFile(String path, boolean cache) {
		VFSFile f = fileMap.get(path);
		if(f == null) {
			fileMap.put(path, f = new VFSFile(this, path, cache));
		}else {
			if(cache) {
				f.setCacheEnabled();
			}
		}
		return f;
	}
	
	public boolean renameFile(String oldName, String newName) {
		return getFile(oldName).rename(newName);
	}
	
	public boolean deleteFile(String path) {
		return getFile(path).delete();
	}
	
	public boolean fileExists(String path) {
		return getFile(path).exists();
	}
	
	public void flushCache(long age) {
		long curr = System.currentTimeMillis();
		Iterator<VFSFile> files = fileMap.values().iterator();
		while(files.hasNext()) {
			if(curr - files.next().cacheHit > age) {
				files.remove();
			}
		}
	}
	
	protected static class DatabaseOpen {
		
		protected final boolean failedInit;
		protected final boolean failedLocked;
		protected final String failedError;
		
		protected final IDBDatabase database;
		
		protected DatabaseOpen(boolean init, boolean locked, String error, IDBDatabase db) {
			failedInit = init;
			failedLocked = locked;
			failedError = error;
			database = db;
		}
		
	}
	
	protected static class AsyncHandlers {
		
		@Async
		protected static native DatabaseOpen openDB(String name);
		
		private static void openDB(String name, final AsyncCallback<DatabaseOpen> cb) {
			IDBFactory i = null;
			try {
				i = IDBFactory.getInstance();
			}catch(Throwable t) {
				cb.complete(new DatabaseOpen(true, false, t.toString(), null));
			}
			final IDBOpenDBRequest f = i.open(name, 1);
			f.setOnBlocked(new EventHandler() {
				@Override
				public void handleEvent() {
					cb.complete(new DatabaseOpen(false, true, null, null));
				}
			});
			f.setOnSuccess(new EventHandler() {
				@Override
				public void handleEvent() {
					cb.complete(new DatabaseOpen(false, false, null, f.getResult()));
				}
			});
			f.setOnError(new EventHandler() {
				@Override
				public void handleEvent() {
					cb.complete(new DatabaseOpen(false, false, "open error", null));
				}
			});
			f.setOnUpgradeNeeded(new EventListener<IDBVersionChangeEvent>() {
				@Override
				public void handleEvent(IDBVersionChangeEvent evt) {
					f.getResult().createObjectStore("filesystem", IDBObjectStoreParameters.create().keyPath("path"));
				}
			});
		}
		
		@Async
		protected static native BooleanResult deleteFile(IDBDatabase db, String name);
		
		private static void deleteFile(IDBDatabase db, String name, final AsyncCallback<BooleanResult> cb) {
			IDBTransaction tx = db.transaction("filesystem", "readwrite");
			final IDBRequest r = tx.objectStore("filesystem").delete(makeTheFuckingKeyWork(name));
			
			r.addEventListener("success", new EventListener<Event>() {
				@Override
				public void handleEvent(Event evt) {
					cb.complete(BooleanResult._new(true));
				}
			});
			r.addEventListener("error", new EventListener<Event>() {
				@Override
				public void handleEvent(Event evt) {
					cb.complete(BooleanResult._new(false));
				}
			});
		}
		
		@JSBody(params = { "obj" }, script = "return (typeof obj === 'undefined') ? null : ((typeof obj.data === 'undefined') ? null : obj.data);")
		protected static native ArrayBuffer readRow(JSObject obj);
		
		@JSBody(params = { "obj" }, script = "return [obj];")
		private static native JSObject makeTheFuckingKeyWork(String k);
		
		@Async
		protected static native ArrayBuffer readWholeFile(IDBDatabase db, String name);
		
		private static void readWholeFile(IDBDatabase db, String name, final AsyncCallback<ArrayBuffer> cb) {
			IDBTransaction tx = db.transaction("filesystem", "readonly");
			final IDBGetRequest r = tx.objectStore("filesystem").get(makeTheFuckingKeyWork(name));
			r.addEventListener("success", new EventListener<Event>() {
				@Override
				public void handleEvent(Event evt) {
					cb.complete(readRow(r.getResult()));
				}
			});
			r.addEventListener("error", new EventListener<Event>() {
				@Override
				public void handleEvent(Event evt) {
					cb.complete(null);
				}
			});
			
		}
		
		@Async
		protected static native BooleanResult fileExists(IDBDatabase db, String name);
		
		private static void fileExists(IDBDatabase db, String name, final AsyncCallback<BooleanResult> cb) {
			IDBTransaction tx = db.transaction("filesystem", "readonly");
			final IDBCountRequest r = tx.objectStore("filesystem").count(makeTheFuckingKeyWork(name));
			r.addEventListener("success", new EventListener<Event>() {
				@Override
				public void handleEvent(Event evt) {
					cb.complete(BooleanResult._new(r.getResult() > 0));
				}
			});
			r.addEventListener("error", new EventListener<Event>() {
				@Override
				public void handleEvent(Event evt) {
					cb.complete(BooleanResult._new(false));
				}
			});
		}
		
		@JSBody(params = { "pat", "dat" }, script = "return { path: pat, data: dat };")
		protected static native JSObject writeRow(String name, ArrayBuffer data);
		
		@Async
		protected static native BooleanResult writeWholeFile(IDBDatabase db, String name, ArrayBuffer data);
		
		private static void writeWholeFile(IDBDatabase db, String name, ArrayBuffer data, final AsyncCallback<BooleanResult> cb) {
			IDBTransaction tx = db.transaction("filesystem", "readwrite");
			final IDBRequest r = tx.objectStore("filesystem").put(writeRow(name, data));
			
			r.addEventListener("success", new EventListener<Event>() {
				@Override
				public void handleEvent(Event evt) {
					cb.complete(BooleanResult._new(true));
				}
			});
			r.addEventListener("error", new EventListener<Event>() {
				@Override
				public void handleEvent(Event evt) {
					cb.complete(BooleanResult._new(false));
				}
			});
		}
		
	}
	
	public static byte[] utf8(String str) {
		if(str == null) return null;
		return str.getBytes(Charset.forName("UTF-8"));
	}
	
	public static String utf8(byte[] str) {
		if(str == null) return null;
		return new String(str, Charset.forName("UTF-8"));
	}
	
	public static String CRLFtoLF(String str) {
		if(str == null) return null;
		return str.indexOf('\r') != -1 ? str.replace("\r", "") : str;
	}
	
	public static String[] lines(String str) {
		if(str == null) return null;
		return CRLFtoLF(str).split("\n");
	}
	
}