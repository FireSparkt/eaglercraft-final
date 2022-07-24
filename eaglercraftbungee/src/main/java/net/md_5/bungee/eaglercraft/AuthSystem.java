package net.md_5.bungee.eaglercraft;

import com.google.common.hash.Hashing;
import net.md_5.bungee.api.config.AuthServiceInfo;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class AuthSystem {
    private final String authFileName;
    private final int ipLimit;

    public AuthSystem(AuthServiceInfo authInfo) {
        this.authFileName = authInfo.getAuthfile();
        this.ipLimit = authInfo.getIpLimit();

        this.readDatabase();
    }

    private static class AuthData {
        public String passHash;
        public Set<String> ips;

        public AuthData(String p, Set<String> i) {
            passHash = p;
            ips = i;
        }
    }

    private final Map<String, AuthData> database = new HashMap<>();

    public boolean register(String username, String password, String ip) {
        synchronized (database) {
            AuthData authData = database.get(username);
            if (authData != null) return false;
            if (isIpAtTheLimit(ip)) return false;
            String hash = Hashing.sha256().hashString(password).toString();
            Set<String> initIps = new HashSet<>();
            initIps.add(ip);
            database.put(username, new AuthData(hash, initIps));
            writeDatabase();
            return true;
        }
    }

    public boolean isRegistered(String username) {
        synchronized (database) {
            return database.containsKey(username);
        }
    }

    public boolean changePass(String username, String password) {
        synchronized (database) {
            AuthData authData = database.get(username);
            authData.passHash = Hashing.sha256().hashString(password).toString();
            writeDatabase();
            return true;
        }
    }

    public boolean login(String username, String password) {
        synchronized (database) {
            AuthData authData = database.get(username);
            if (authData == null) return false;
            return authData.passHash.equals(Hashing.sha256().hashString(password).toString());
        }
    }

    private boolean isIpAtTheLimit(String ip) {
        synchronized (database) {
            if (this.ipLimit <= 0) return false;
            int num = 0;
            for (AuthData authData : database.values()) {
                if (authData.ips.contains(ip)) num++;
                if (num >= this.ipLimit) {
                    return true;
                }
            }
            return false;
        }
    }

    // only use once, on load
    public void readDatabase() {
        synchronized (database) {
            try {
                File authFile = new File(this.authFileName);
                if (!authFile.exists()) authFile.createNewFile();

                Map<String, AuthData> cache = new HashMap<>();

                String[] lines = new String(Files.readAllBytes(authFile.toPath())).trim().split("\n");
                if (lines.length == 1 && lines[0].isEmpty()) return;
                for (String line : lines) {
                    String[] pieces = line.split("\u0000");
                    cache.put(pieces[0], new AuthData(pieces[2], new HashSet<>(Arrays.asList(pieces[1].split("§")))));
                }

                database.clear();
                database.putAll(cache);
                cache.clear();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private void writeDatabase() {
        synchronized (database) {
            StringBuilder out = new StringBuilder();

            for (String username : database.keySet()) {
                AuthData entry = database.get(username);
                out.append(username);
                out.append("\u0000");
                out.append(String.join("§", entry.ips));
                out.append("\u0000");
                out.append(entry.passHash);
                out.append("\n");
            }

            try {
                Files.write(Paths.get(this.authFileName), out.toString().getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}