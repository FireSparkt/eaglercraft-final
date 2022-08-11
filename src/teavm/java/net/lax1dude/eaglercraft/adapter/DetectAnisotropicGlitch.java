package net.lax1dude.eaglercraft.adapter;

import static net.lax1dude.eaglercraft.adapter.teavm.WebGL2RenderingContext.*;

import org.teavm.jso.browser.Window;
import org.teavm.jso.dom.html.HTMLCanvasElement;

import net.lax1dude.eaglercraft.adapter.teavm.WebGL2RenderingContext;

public class DetectAnisotropicGlitch {

	public static boolean detectGlitch() {
		//HTMLCanvasElement cvs = (HTMLCanvasElement) Window.current().getDocument().createElement("canvas");
		//WebGL2RenderingContext ctx = (WebGL2RenderingContext) cvs.getContext("webgl2");
		
		
		
		return EaglerAdapterImpl2.isWindows(); //TODO
	}
	
}
