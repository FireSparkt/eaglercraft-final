package net.lax1dude.eaglercraft.zip_generator;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;

public class ZipGenerator {

	public static void main(String[] args) throws IOException {

		System.out.println();
		System.out.println("Notes:");
		System.out.println();
		System.out.println(" - please run \"gradlew teavmc\" on the client and integrated server");
		System.out.println(" - please run \"epkcompiler/run.bat\" (or run.sh) to generate \"javascript/assets.epk\"");
		System.out.println(" - compile eaglercraftbungee and put it in it's \"stable-download/java/bungee_command\" folder");
		System.out.println();
		
		try {
			if(!net.lax1dude.eaglercraft.v1_8.buildtools.Java11Check.classLoadCheck()) {
				throw new RuntimeException("wtf?");
			}
		}catch(Throwable t) {
			System.err.println("ERROR: A minimum of Java 11 is required to run this tool!");
			System.err.println();
			System.err.println("You are using Java " + System.getProperty("java.version"));
			System.err.println();
			return;
		}

		String date = (new SimpleDateFormat("MM/dd/yyyy")).format(new Date());
		System.out.println("Using date: " + date);
		
		System.out.println();
		
		System.out.println("Running closure compiler on 'eagswebrtc.js'...");
		JARSubprocess.runJava(new File("."), new String[] { "-jar", "zip-generator/google-closure-compiler.jar", "--js", "javascript/eagswebrtc.js",
				"--js_output_file", "stable-download/web/eagswebrtc.js", "-O", "SIMPLE" }, "[ClosureCompiler]");

		System.out.println("Loading 'javascript/classes.js'");
		String classesJs = FileUtils.readFileToString(new File("javascript/classes.js"), "UTF-8").replaceFirst("\\/\\/# sourceMappingURL=.*(\\r\\n|\\r|\\n)*", "").trim();

		System.out.println("Loading 'javascript/classes_server.js'");
		String classesServerJs = FileUtils.readFileToString(new File("javascript/classes_server.js"), "UTF-8").replaceFirst("\\/\\/# sourceMappingURL=.*(\\r\\n|\\r|\\n)*", "").trim();
		
		System.out.println("Loading 'javascript/assets.epk'");
		String assetsEpk = Base64.encodeBase64String(FileUtils.readFileToByteArray(new File("javascript/assets.epk")));

		System.out.println("Loading 'stable-download/web/eagswebrtc.js'");
		String classesWebRTCJs = FileUtils.readFileToString(new File("stable-download/web/eagswebrtc.js"), "UTF-8").replaceFirst("[\\'\\\"]use strict[\\'\\\"]\\;(\\r\\n|\\r|\\n)*", "").trim();

		System.out.println("Loading 'zip-generator/Offline_Download_Version_Template.html'");
		String offlineTemplate = FileUtils.readFileToString(new File("zip-generator/Offline_Download_Version_Template.html"), "UTF-8");
		
		System.out.println("Writing 'stable-download/Offline_Download_Version.html'");
		
		offlineTemplate = offlineTemplate.replace("${date}", date).replace("${assets_epk_base64}", assetsEpk).replace("${classes_js}", classesJs);
		offlineTemplate = offlineTemplate.replace("${eagswebrtc_js}", classesWebRTCJs).replace("${classes_server_js}", classesServerJs);
		
		FileUtils.writeStringToFile(new File("stable-download/Offline_Download_Version.html"), offlineTemplate, "UTF-8");
		
		System.out.println("Copying 'javascript/classes.js' to 'stable-download/web/classes.js'");
		FileUtils.copyFile(new File("javascript/classes.js"), new File("stable-download/web/classes.js"));
		
		System.out.println("Copying 'javascript/classes.js.map' to 'stable-download/web/classes.js.map'");
		FileUtils.copyFile(new File("javascript/classes.js.map"), new File("stable-download/web/classes.js.map"));
		
		System.out.println("Copying 'javascript/classes_server.js' to 'stable-download/web/classes_server.js'");
		FileUtils.copyFile(new File("javascript/classes_server.js"), new File("stable-download/web/classes_server.js"));
		
		System.out.println("Copying 'javascript/classes_server.js.map' to 'stable-download/web/classes_server.js.map'");
		FileUtils.copyFile(new File("javascript/classes_server.js.map"), new File("stable-download/web/classes_server.js.map"));
		
		System.out.println("Copying 'javascript/assets.epk' to 'stable-download/web/assets.epk'");
		FileUtils.copyFile(new File("javascript/assets.epk"), new File("stable-download/web/assets.epk"));
		
		System.out.println("Copying 'javascript/worker_bootstrap.js' to 'stable-download/web/worker_bootstrap.js'");
		FileUtils.copyFile(new File("javascript/worker_bootstrap.js"), new File("stable-download/web/worker_bootstrap.js"));
		
		System.out.println("Writing 'stable-download/stable-download.zip'");
		
		ZipOutputStream zOut = new ZipOutputStream(new FileOutputStream(new File("stable-download/stable-download.zip")));
		zOut.setLevel(9);

		zipFolder(zOut, "web", new File("stable-download/web"));
		zipFolder(zOut, "java", new File("stable-download/java"));
		
		zOut.close();
		
		System.out.println("Writing 'stable-download/stable-download_repl.zip'");

		ZipOutputStream zOutRepl = new ZipOutputStream(new FileOutputStream(new File("stable-download/stable-download_repl.zip")));
		zOutRepl.setLevel(9);

		zipFolder(zOutRepl, "web", new File("stable-download/web"), true);
		zipFolder(zOutRepl, "java", new File("stable-download/java"));

		zOutRepl.close();
		
	}

	private static void zipFolder(ZipOutputStream zOut, String pfx, File file) throws IOException {
		zipFolder(zOut, pfx, file, false);
	}

	private static void zipFolder(ZipOutputStream zOut, String pfx, File file, boolean repl) throws IOException {
		zipFolder0(zOut, file.getAbsolutePath().replace('\\', '/'), pfx, file, repl);
	}

	private static void zipFolder0(ZipOutputStream zOut, String pfx, String writePfx, File file) throws IOException {
		zipFolder0(zOut, pfx, writePfx, file, false);
	}

	private static void zipFolder0(ZipOutputStream zOut, String pfx, String writePfx, File file, boolean repl) throws IOException {
		byte[] replCache = new byte[0];
		if(writePfx.length() > 0 && !writePfx.endsWith("/")) {
			writePfx = writePfx + "/";
		}
		for(File f : file.listFiles()) {
			if(f.isDirectory()) {
				zipFolder0(zOut, pfx, writePfx, f); // do not apply repl boolean to subdirs, as it only happens for this one top level directory in the web folder
			}else if(f.isFile()) {
				String path = f.getAbsolutePath().replace('\\', '/').replace(pfx, "");
				if(path.startsWith("/")) {
					path = path.substring(1);
				}
				if (repl && (f.getName().equals("classes.js") || f.getName().equals("eagswebrtc.js"))) {
					if (replCache.length == 0) {
						replCache = FileUtils.readFileToByteArray(f);
					} else {
						System.out.println("Concatenating 'eagswebrtc.js' onto 'classes.js'");
						byte[] newFile = FileUtils.readFileToByteArray(f);
						byte[] replCacheCache = replCache;
						replCache = new byte[replCache.length + 2 + newFile.length];
						System.arraycopy(replCacheCache, 0, replCache, 0, replCacheCache.length);
						System.arraycopy(newFile, 0, replCache, replCacheCache.length + 2, newFile.length);
						// add line breaks between them
						replCache[replCacheCache.length] = 10;
						replCache[replCacheCache.length + 1] = 10;
					}
				} else {
					zipFile(zOut, writePfx + path, f);
				}
			}
		}
		if (repl) {
			zipFile(zOut, writePfx + "classes.js", replCache);
		}
	}

	private static void zipFile(ZipOutputStream zOut, String name, File file) throws IOException {
		zipFile(zOut, name, FileUtils.readFileToByteArray(file));
	}

	private static void zipFile(ZipOutputStream zOut, String name, byte[] data) throws IOException {
		zOut.putNextEntry(new ZipEntry(name));
		IOUtils.write(data, zOut);
	}

}
