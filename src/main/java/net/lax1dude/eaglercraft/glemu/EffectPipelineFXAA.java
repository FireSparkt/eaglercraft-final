package net.lax1dude.eaglercraft.glemu;

import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wGL_ARRAY_BUFFER;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wGL_BACK;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wGL_CLAMP;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wGL_COLOR_ATTACHMENT0;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wGL_COLOR_BUFFER_BIT;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wGL_CULL_FACE;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wGL_DEPTH_ATTACHMENT;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wGL_DEPTH_BUFFER_BIT;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wGL_DEPTH_COMPONENT32F;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wGL_DEPTH_TEST;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wGL_DRAW_FRAMEBUFFER;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wGL_FLOAT;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wGL_FRAGMENT_SHADER;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wGL_FRAMEBUFFER;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wGL_LINE_SMOOTH;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wGL_MULTISAMPLE;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wGL_NEAREST;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wGL_READ_FRAMEBUFFER;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wGL_RGB;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wGL_RGB8;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wGL_STATIC_DRAW;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wGL_TEXTURE0;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wGL_TEXTURE_2D;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wGL_TEXTURE_MAG_FILTER;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wGL_TEXTURE_MIN_FILTER;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wGL_TEXTURE_WRAP_S;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wGL_TEXTURE_WRAP_T;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wGL_TRIANGLES;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wGL_UNSIGNED_BYTE;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wGL_VERTEX_SHADER;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wgetShaderHeader;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglActiveTexture;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglAttachShader;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglBindBuffer;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglBindFramebuffer;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglBindRenderbuffer;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglBindTexture;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglBindVertexArray;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglBlitFramebuffer;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglBufferData0;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglClear;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglCompileShader;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglCreateBuffer;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglCreateFramebuffer;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglCreateProgram;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglCreateRenderBuffer;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglCreateShader;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglCreateVertexArray;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglDeleteFramebuffer;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglDeleteRenderbuffer;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglDeleteShader;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglDeleteTextures;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglDepthMask;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglDetachShader;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglDisable;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglDrawArrays;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglDrawBuffer;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglEnable;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglEnableVertexAttribArray;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglFramebufferRenderbuffer;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglFramebufferTexture2D;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglGenTextures;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglGetProgramInfoLog;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglGetProgramLinked;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglGetShaderCompiled;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglGetShaderInfoLog;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglGetUniformLocation;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglLinkProgram;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglRenderbufferStorage;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglRenderbufferStorageMultisample;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglShaderSource;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglTexImage2D;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglTexParameteri;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglUniform1i;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglUniform2f;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglUseProgram;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglVertexAttribPointer;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2._wglViewport;
import static net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2.fileContents;
import static net.lax1dude.eaglercraft.glemu.EaglerAdapterGL30.isWebGL;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.IntBuffer;

import net.lax1dude.eaglercraft.EaglerAdapter;
import net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2.BufferArrayGL;
import net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2.BufferGL;
import net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2.FramebufferGL;
import net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2.ProgramGL;
import net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2.RenderbufferGL;
import net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2.ShaderGL;
import net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2.TextureGL;
import net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2.UniformGL;
import net.minecraft.client.Minecraft;

public class EffectPipelineFXAA {
	
	private static boolean isUsingFXAA = false;

	private static FramebufferGL framebuffer = null;
	private static RenderbufferGL framebuffer_color = null;
	private static RenderbufferGL framebuffer_depth = null;

	private static ProgramGL fxaaProgram = null;
	private static TextureGL fxaaSourceTexture = null;
	private static UniformGL fxaaScreenSize = null;
	
	private static BufferArrayGL renderQuadArray = null;
	private static BufferGL renderQuadBuffer;

	public static int displayWidth = -1;
	public static int displayHeight = -1;
	public static int width = -1;
	public static int height = -1;

	private static int[] originalViewport = new int[4];

	private static int state = 1;
	private static int newState = -1;
	private static boolean msaaInit = false;
	
	private static void initFXAA() {
		if(fxaaProgram == null) {
			renderQuadArray = _wglCreateVertexArray();
			renderQuadBuffer = _wglCreateBuffer();
			
			IntBuffer upload = (isWebGL ? IntBuffer.wrap(new int[12]) : ByteBuffer.allocateDirect(12 << 2).order(ByteOrder.nativeOrder()).asIntBuffer());
			upload.put(Float.floatToRawIntBits(0.0f)); upload.put(Float.floatToRawIntBits(0.0f));
			upload.put(Float.floatToRawIntBits(0.0f)); upload.put(Float.floatToRawIntBits(1.0f));
			upload.put(Float.floatToRawIntBits(1.0f)); upload.put(Float.floatToRawIntBits(0.0f));
			upload.put(Float.floatToRawIntBits(0.0f)); upload.put(Float.floatToRawIntBits(1.0f));
			upload.put(Float.floatToRawIntBits(1.0f)); upload.put(Float.floatToRawIntBits(1.0f));
			upload.put(Float.floatToRawIntBits(1.0f)); upload.put(Float.floatToRawIntBits(0.0f));
			upload.flip();
			
			_wglBindVertexArray(renderQuadArray);
			_wglBindBuffer(_wGL_ARRAY_BUFFER, renderQuadBuffer);
			_wglBufferData0(_wGL_ARRAY_BUFFER, upload, _wGL_STATIC_DRAW);
			_wglEnableVertexAttribArray(0);
			_wglVertexAttribPointer(0, 2, _wGL_FLOAT, false, 8, 0);
			
			ShaderGL pvert_shader = _wglCreateShader(_wGL_VERTEX_SHADER);

			_wglShaderSource(pvert_shader, _wgetShaderHeader() + "\n" + fileContents("/glsl/pvert.glsl"));
			_wglCompileShader(pvert_shader);

			if (!_wglGetShaderCompiled(pvert_shader)) System.err.println(("\n" + _wglGetShaderInfoLog(pvert_shader)).replace("\n", "\n[/glsl/pvert.glsl] ") + "\n");
			
			ShaderGL fxaa_shader = _wglCreateShader(_wGL_FRAGMENT_SHADER);
			_wglShaderSource(fxaa_shader, _wgetShaderHeader() + "\n" + fileContents("/glsl/fxaa.glsl"));
			_wglCompileShader(fxaa_shader);
			
			if (!_wglGetShaderCompiled(fxaa_shader)) System.err.println(("\n" + _wglGetShaderInfoLog(fxaa_shader)).replace("\n", "\n[/glsl/fxaa.glsl] ") + "\n");
			
			fxaaProgram = _wglCreateProgram();
			_wglAttachShader(fxaaProgram, pvert_shader);
			_wglAttachShader(fxaaProgram, fxaa_shader);
			_wglLinkProgram(fxaaProgram);
			_wglDetachShader(fxaaProgram, pvert_shader);
			_wglDetachShader(fxaaProgram, fxaa_shader);
			_wglDeleteShader(pvert_shader);
			_wglDeleteShader(fxaa_shader);
			
			if(!_wglGetProgramLinked(fxaaProgram)) {
				System.err.println(("\n"+_wglGetProgramInfoLog(fxaaProgram)).replace("\n", "\n[/glsl/fxaa.glsl][LINKER] ") + "\n");
				fxaaProgram = null;
				throw new RuntimeException("Invalid shader code");
			}
			
			_wglUseProgram(fxaaProgram);
			
			UniformGL c = _wglGetUniformLocation(fxaaProgram, "f_color");
			if(c != null) _wglUniform1i(c, 0);
			
			fxaaScreenSize = _wglGetUniformLocation(fxaaProgram, "screenSize");
		}
		
		destroy();
		
		isUsingFXAA = true;
		framebuffer = _wglCreateFramebuffer();
		fxaaSourceTexture = _wglGenTextures();
		
		_wglBindTexture(_wGL_TEXTURE_2D, fxaaSourceTexture);
		_wglTexParameteri(_wGL_TEXTURE_2D, _wGL_TEXTURE_MAG_FILTER, _wGL_NEAREST);
		_wglTexParameteri(_wGL_TEXTURE_2D, _wGL_TEXTURE_MIN_FILTER, _wGL_NEAREST);
		_wglTexParameteri(_wGL_TEXTURE_2D, _wGL_TEXTURE_WRAP_S, _wGL_CLAMP);
		_wglTexParameteri(_wGL_TEXTURE_2D, _wGL_TEXTURE_WRAP_T, _wGL_CLAMP);
		_wglTexImage2D(_wGL_TEXTURE_2D, 0, _wGL_RGB8, width, height, 0, _wGL_RGB, _wGL_UNSIGNED_BYTE, (ByteBuffer)null);
		
		
		framebuffer_depth = _wglCreateRenderBuffer();
		_wglBindRenderbuffer(framebuffer_depth);
		_wglRenderbufferStorage(_wGL_DEPTH_COMPONENT32F, width, height);
		
		_wglBindFramebuffer(_wGL_FRAMEBUFFER, framebuffer);
		_wglFramebufferTexture2D(_wGL_COLOR_ATTACHMENT0, fxaaSourceTexture);
		_wglFramebufferRenderbuffer(_wGL_DEPTH_ATTACHMENT, framebuffer_depth);
	}
	
	private static void initMSAA() {
		destroy();
		msaaInit = true;
		framebuffer = _wglCreateFramebuffer();
		framebuffer_color = _wglCreateRenderBuffer();
		framebuffer_depth = _wglCreateRenderBuffer();
		_wglBindFramebuffer(_wGL_FRAMEBUFFER, framebuffer);
		_wglBindRenderbuffer(framebuffer_color);
		_wglRenderbufferStorageMultisample(state == 2 ? 4 : 8, _wGL_RGB8, width, height);
		_wglBindRenderbuffer(framebuffer_depth);
		_wglRenderbufferStorageMultisample(state == 2 ? 4 : 8, _wGL_DEPTH_COMPONENT32F, width, height);
		_wglFramebufferRenderbuffer(_wGL_COLOR_ATTACHMENT0, framebuffer_color);
		_wglFramebufferRenderbuffer(_wGL_DEPTH_ATTACHMENT, framebuffer_depth);
	}
	
	public static void destroy() {
		isUsingFXAA = false;
		msaaInit = false;
		if(framebuffer != null) _wglDeleteFramebuffer(framebuffer);
		if(framebuffer_color != null) _wglDeleteRenderbuffer(framebuffer_color);
		if(framebuffer_depth != null) _wglDeleteRenderbuffer(framebuffer_depth);
		if(fxaaSourceTexture != null) _wglDeleteTextures(fxaaSourceTexture);
		framebuffer = null;
		framebuffer_color = null;
		framebuffer_depth = null;
		fxaaSourceTexture = null;
	}

	public static void beginPipelineRender() {
		if(displayWidth <= 0 || displayHeight <= 0) {
			return;
		}
		int mode = Minecraft.getMinecraft().gameSettings.antialiasMode;
		if(mode == 0) newState = 0;
		if(mode == 1) newState = Minecraft.getMinecraft().gameSettings.fancyGraphics ? 1 : 0;
		if(mode == 2) newState = 1;
		if(mode == 3) newState = 2;
		if(mode == 4) newState = 3;
		if(newState == 0) {
			state = newState;
			destroy();
			return;
		}
		if(newState != state && !(newState == 3 && state == 2)) {
			destroy();
		}
		//_wglGetParameter(_wGL_VIEWPORT, 4, originalViewport);
		if (displayWidth != width || displayHeight != height || state != newState) {
			state = newState;
			width = displayWidth;
			height = displayHeight;
			originalViewport[0] = 0;
			originalViewport[1] = 0;
			originalViewport[2] = width;
			originalViewport[3] = height;
			if(state == 1) {
				if(isUsingFXAA == false) {
					initFXAA();
				}else {
					_wglBindTexture(_wGL_TEXTURE_2D, fxaaSourceTexture);
					_wglTexImage2D(_wGL_TEXTURE_2D, 0, _wGL_RGB8, width, height, 0, _wGL_RGB, _wGL_UNSIGNED_BYTE, (ByteBuffer)null);
					_wglBindRenderbuffer(framebuffer_depth);
					_wglRenderbufferStorage(_wGL_DEPTH_COMPONENT32F, width, height);
				}
			}else if(state == 2 || state == 3) {
				if(msaaInit == false) {
					initMSAA();
				}else {
					_wglBindRenderbuffer(framebuffer_color);
					_wglRenderbufferStorageMultisample(state == 2 ? 4 : 8, _wGL_RGB8, width, height);
					_wglBindRenderbuffer(framebuffer_depth);
					_wglRenderbufferStorageMultisample(state == 2 ? 4 : 8, _wGL_DEPTH_COMPONENT32F, width, height);
				}
			}
		}
		_wglBindFramebuffer(_wGL_FRAMEBUFFER, framebuffer);
		_wglViewport(0, 0, width, height);
		if(!EaglerAdapter.isWebGL && (state == 2 || state == 3)) {
			_wglEnable(_wGL_MULTISAMPLE);
			_wglEnable(_wGL_LINE_SMOOTH);
		}
	}

	public static void endPipelineRender() {
		if(displayWidth <= 0 || displayHeight <= 0 || state == 0) {
			return;
		}
		_wglBindFramebuffer(_wGL_FRAMEBUFFER, null);
		_wglClear(_wGL_COLOR_BUFFER_BIT | _wGL_DEPTH_BUFFER_BIT);
		if(state == 1) {
			_wglViewport(originalViewport[0], originalViewport[1], originalViewport[2], originalViewport[3]);
			_wglActiveTexture(_wGL_TEXTURE0);
			_wglBindTexture(_wGL_TEXTURE_2D, fxaaSourceTexture);
			_wglDisable(_wGL_DEPTH_TEST);
			_wglDisable(_wGL_CULL_FACE);
			_wglDepthMask(false);
			_wglUseProgram(fxaaProgram);
			_wglUniform2f(fxaaScreenSize, width, height);
			_wglBindVertexArray(renderQuadArray);
			_wglDrawArrays(_wGL_TRIANGLES, 0, 6);
			_wglEnable(_wGL_DEPTH_TEST);
			_wglDepthMask(true);
		}else if(state == 2 || state == 3) {
			if(!EaglerAdapter.isWebGL) {
				_wglDisable(_wGL_MULTISAMPLE);
				_wglDisable(_wGL_LINE_SMOOTH);
			}
			_wglViewport(originalViewport[0], originalViewport[1], originalViewport[2], originalViewport[3]);
			_wglBindFramebuffer(_wGL_READ_FRAMEBUFFER, framebuffer);
			_wglBindFramebuffer(_wGL_DRAW_FRAMEBUFFER, null);
			_wglDrawBuffer(_wGL_BACK);
			_wglBlitFramebuffer(0, 0, width, height, 0, 0, width, height, _wGL_COLOR_BUFFER_BIT, _wGL_NEAREST);
			_wglBindFramebuffer(_wGL_READ_FRAMEBUFFER, null);
		}
	}
	
}
