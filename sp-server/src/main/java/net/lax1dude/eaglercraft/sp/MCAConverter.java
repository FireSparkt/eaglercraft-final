package net.lax1dude.eaglercraft.sp;

import java.io.ByteArrayInputStream;
import java.io.OutputStream;
import com.jcraft.jzlib.GZIPOutputStream;
import java.util.zip.InflaterInputStream;

public class MCAConverter {
    public static void convertMCA(VFile dir, byte[] file, String fileName) {
        VFile levelDir = new VFile(dir, "level" + (fileName.startsWith("region/") ? "0" : fileName.substring(3, fileName.indexOf('/'))));

        String[] xz = fileName.substring(fileName.lastIndexOf('r') + 2, fileName.length() - 4).split("\\.");
        int gx = Integer.parseInt(xz[0]);
        int gz = Integer.parseInt(xz[1]);

        try {
            byte[] buffer = new byte[16000];
            for (int x = 0; x < 32; ++x) {
                for (int z = 0; z < 32; ++z) {
                    int i = ((x % 32) + (z % 32) * 32) * 4;
                    int offset = (((file[i] & 0xff) << 16) | ((file[i + 1] & 0xff) << 8) | (file[i + 2] & 0xff)) * 4096;
                    if (offset == 0 && file[i + 3] == 0) {
                        continue;
                    }
                    int chunkLen = (((file[offset] & 0xff) << 24) | ((file[offset + 1] & 0xff) << 16) | ((file[offset + 2] & 0xff) << 8) | (file[offset + 3] & 0xff));
                    if (chunkLen == 0) continue;
                    byte compression = file[offset + 4];
                    byte[] data = new byte[chunkLen - 1];
                    System.arraycopy(file, offset + 5, data, 0, chunkLen - 1);
                    if (compression == 0) {
                        OutputStream os = new VFile(levelDir, VFSChunkLoader.getChunkPath(gx * 32 + x, gz * 32 + z) + ".dat").getOutputStream();
                        GZIPOutputStream gos = new GZIPOutputStream(os);
                        ByteArrayInputStream bais = new ByteArrayInputStream(data);
                        int len;
                        while ((len = bais.read(buffer)) > 0) {
                            gos.write(buffer, 0, len);
                        }
                        gos.close();
                        os.close();
                        bais.close();
                    } else if (compression == 2) {
                        OutputStream os = new VFile(levelDir, VFSChunkLoader.getChunkPath(gx * 32 + x, gz * 32 + z) + ".dat").getOutputStream();
                        GZIPOutputStream gos = new GZIPOutputStream(os);
                        InflaterInputStream iis = new InflaterInputStream(new ByteArrayInputStream(data));
                        int len;
                        while ((len = iis.read(buffer)) > 0) {
                            gos.write(buffer, 0, len);
                        }
                        gos.close();
                        os.close();
                        iis.close();
                    } else if (compression == 1) {
                        new VFile(levelDir, VFSChunkLoader.getChunkPath(gx * 32 + x, gz * 32 + z) + ".dat").setAllBytes(data);
                    }
                }
            }
        } catch (Throwable e) {
            e.printStackTrace();
        }
    }
}
