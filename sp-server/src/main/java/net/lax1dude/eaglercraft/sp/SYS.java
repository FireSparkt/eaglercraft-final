package net.lax1dude.eaglercraft.sp;

import org.teavm.interop.Async;
import org.teavm.interop.AsyncCallback;
import org.teavm.jso.JSBody;
import org.teavm.jso.JSFunctor;
import org.teavm.jso.JSObject;
import org.teavm.jso.browser.Window;

import net.lax1dude.eaglercraft.sp.VirtualFilesystem.VFSHandle;

public class SYS {

	public static final boolean PERSIST;
	public static final VirtualFilesystem VFS;
	
	@JSFunctor
    private interface PromiseHandler extends JSObject {
        void complete(JSObject result);
    }
	
	@Async
	private static native BooleanResult requestPersist();
	
	private static void requestPersist(AsyncCallback<BooleanResult> callback) {
		requestPersist0(res -> callback.complete(BooleanResult._new(res != null)));
	}
	
	@JSBody(params = { "callback" }, script = "if(navigator.storage && navigator.storage.persist){"
			+ "navigator.storage.persist().then(function(persistent) {callback(persistent ? {p:true} : null);});"
			+ "}else{callback(null);}")
	private static native void requestPersist0(PromiseHandler callback);
	
	static {
		
		PERSIST = requestPersist().bool;
		
		if(!PERSIST) {
			Window.alert("PERSISTENT STORAGE NOT AVAILABLE, YOUR BROWSER MAY DELETE YOUR WORLDS!");
		}
		
		VFSHandle vh = VirtualFilesystem.openVFS("_net_lax1dude_eaglercraft_sp_VirtualFilesystem_1_5_2");
		
		if(vh.vfs == null) {
			Window.alert("COULD NOT INIT FILESYSTEM: " + vh.toString());
		}
		
		VFS = vh.vfs;
		
	}
	
	
}
