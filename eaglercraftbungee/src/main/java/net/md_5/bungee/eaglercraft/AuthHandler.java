package net.md_5.bungee.eaglercraft;

import net.md_5.bungee.BungeeCord;
import net.md_5.bungee.ServerConnection;
import net.md_5.bungee.UserConnection;
import net.md_5.bungee.Util;
import net.md_5.bungee.api.ProxyServer;
import net.md_5.bungee.api.config.ServerInfo;
import net.md_5.bungee.api.event.PostLoginEvent;
import net.md_5.bungee.connection.UpstreamBridge;
import net.md_5.bungee.netty.ChannelWrapper;
import net.md_5.bungee.netty.HandlerBoss;
import net.md_5.bungee.netty.PacketHandler;
import net.md_5.bungee.protocol.packet.Packet1Login;
import net.md_5.bungee.protocol.packet.Packet9Respawn;
import net.md_5.bungee.protocol.packet.Packet0DPositionAndLook;
import net.md_5.bungee.protocol.packet.Packet3Chat;
import net.md_5.bungee.protocol.packet.Packet0KeepAlive;
import net.md_5.bungee.protocol.packet.PacketCCSettings;

public class AuthHandler extends PacketHandler {
    private static final AuthSystem authSystem = BungeeCord.getInstance().authSystem;

    private final ProxyServer bungee;
    private final UserConnection con;
    private final HandlerBoss handlerBoss;
    private final String username;

    private boolean loggedIn = false;

    public AuthHandler(final ProxyServer bungee, final UserConnection con, final HandlerBoss handlerBoss) {
        this.bungee = bungee;
        this.con = con;
        this.handlerBoss = handlerBoss;

        this.username = this.con.getName();

        new Thread(() -> {
            for (int i = 0; i < 120; i++) {
                if (this.loggedIn) break;
                try {
                    Thread.sleep(250);
                } catch (InterruptedException ignored) {  }
            }
            if (this.loggedIn) return;
            this.con.disconnect("You did not login in time!");
        }).start();

        this.con.unsafe().sendPacket(new Packet1Login(0, "END", (byte) 2, 1, (byte) 0, (byte) 0, (byte) 1));
        this.con.unsafe().sendPacket(new Packet9Respawn(1, (byte) 0, (byte) 2, (short) 255, "END"));
        this.con.unsafe().sendPacket(new Packet0DPositionAndLook(0, 0, 0, 0, 0f, 0f, true));

        if (authSystem.isRegistered(this.username)) {
            this.con.sendMessage("\u00A7cPlease login to continue! /login <password>");
        } else {
            this.con.sendMessage("\u00A7cPlease register to continue! /register <password> <confirmPassword>");
        }
    }

    @Override
    public void exception(final Throwable t) throws Exception {
        this.con.disconnect(Util.exception(t));
    }

    @Override
    public void disconnected(final ChannelWrapper channel) throws Exception {
        this.loggedIn = true;
    }

    @Override
    public void handle(final Packet0KeepAlive alive) throws Exception {
        if (alive.getRandomId() == this.con.getSentPingId()) {
            final int newPing = (int) (System.currentTimeMillis() - this.con.getSentPingTime());
            this.con.setPing(newPing);
        }
    }

    @Override
    public void handle(final Packet3Chat chat) throws Exception {
        String message = chat.getMessage();
        if (message.startsWith("/")) {
            String[] args = message.substring(1).trim().split(" ");
            switch (args[0]) {
                case "login":
                case "l":
                    if (args.length == 1) {
                        this.con.sendMessage("\u00A7cYou must specify a password to login! /login <password>");
                    } else if (!authSystem.isRegistered(this.username)) {
                        this.con.sendMessage("\u00A7cThis username is not registered on this server!");
                    } else if (authSystem.login(this.username, args[1])) {
                        this.onLogin();
                    } else {
                        this.con.sendMessage("\u00A7cThat password is invalid!");
                    }
                    break;
                case "register":
                case "reg":
                    if (args.length == 1 || args.length == 2) {
                        this.con.sendMessage("\u00A7cUsage: /" + args[0].toLowerCase() + " <password> <confirmPassword>");
                    } else if (!args[1].equals(args[2])) {
                        this.con.sendMessage("\u00A7cThose passwords do not match!");
                    } else if (authSystem.isRegistered(this.username)) {
                        this.con.sendMessage("\u00A7cThis username is already registered!");
                    } else if (authSystem.register(this.username, args[1], this.con.getAddress().toString())) {
                        this.onLogin();
                    } else {
                        this.con.sendMessage("\u00A7cUnable to register...");
                    }
                    break;
                case "changepassword":
                case "changepasswd":
                case "changepwd":
                case "changepass":
                    if (args.length == 1 || args.length == 2) {
                        this.con.sendMessage("\u00A7cUsage: /" + args[0].toLowerCase() + " <oldPassword> <newPassword>");
                    } else if (authSystem.login(this.username, args[1])) {
                        if (authSystem.changePass(this.username, args[2])) {
                            this.con.sendMessage("\u00A7cPassword changed successfully!");
                        } else {
                            this.con.sendMessage("\u00A7cUnable to change your password...");
                        }
                    } else {
                        this.con.sendMessage("\u00A7cThe old password specified is incorrect!");
                    }
                    break;
                default:
            }
        }
    }

    private void onLogin() {
        this.loggedIn = true;
        this.bungee.getPluginManager().callEvent(new PostLoginEvent(this.con));
        handlerBoss.setHandler(new UpstreamBridge(this.bungee, this.con));
        final ServerInfo server = this.bungee.getReconnectHandler().getServer(this.con);
        this.con.setServer(new ServerConnection(null, null));
        this.con.connect(server, true);
    }

    @Override
    public void handle(final PacketCCSettings settings) throws Exception {
        this.con.setSettings(settings);
    }

    @Override
    public String toString() {
        return "[" + this.con.getName() + "] -> AuthHandler";
    }
}
