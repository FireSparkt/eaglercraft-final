package net.md_5.bungee.eaglercraft;

import net.md_5.bungee.UserConnection;
import net.md_5.bungee.api.event.PlayerDisconnectEvent;
import net.md_5.bungee.api.event.PluginMessageEvent;
import net.md_5.bungee.api.event.PostLoginEvent;
import net.md_5.bungee.api.plugin.Listener;
import net.md_5.bungee.api.plugin.Plugin;
import net.md_5.bungee.api.plugin.PluginDescription;
import net.md_5.bungee.event.EventHandler;
import org.json.JSONObject;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.Collections;

public class PluginEaglerVoice extends Plugin implements Listener {

    private final Map<String, UserConnection> voicePlayers = new HashMap<>();
    private final Map<String, ExpiringSet<String>> voiceRequests = new HashMap<>();
    private final Set<String[]> voicePairs = new HashSet<>();

    public PluginEaglerVoice() {
        super(new PluginDescription("EaglerVoice", PluginEaglerVoice.class.getName(), "1.0.0", "ayunami2000", Collections.emptySet(), null));
    }

    public void onLoad() {

    }

    public void onEnable() {
        getProxy().getPluginManager().registerListener(this, this);
    }

    public void onDisable() {

    }

    @EventHandler
    public void onPluginMessage(PluginMessageEvent event) {
        if(event.getSender() instanceof UserConnection && event.getData().length > 0) {
            UserConnection connection = (UserConnection) event.getSender();
            String user = connection.getName();
            byte[] msg = event.getData();
            try {
                if("EAG|VoiceJoin".equals(event.getTag())) {
                    if (voicePlayers.containsKey(user)) return; // user is already using voice chat
                    // send out packet for player joined voice
                    // notice: everyone on the server can see this packet!! however, it doesn't do anything but let clients know that the player has turned on voice chat
                    for (UserConnection conn : voicePlayers.values()) conn.sendData("EAG|VoiceJoin", user.getBytes(StandardCharsets.UTF_8));
                    voicePlayers.put(user, connection);
                }else if("EAG|VoiceLeave".equals(event.getTag())) {
                    if (!voicePlayers.containsKey(user)) return; // user is not using voice chat
                    removeUser(user);
                }else if("EAG|VoiceReq".equals(event.getTag())) {
                    if (!voicePlayers.containsKey(user)) return; // user is not using voice chat
                    String targetUser = new String(msg, StandardCharsets.UTF_8);
                    if (user.equals(targetUser)) return; // prevent duplicates
                    if (checkVoicePair(user, targetUser)) return; // already paired
                    if (!voicePlayers.containsKey(targetUser)) return; // target user is not using voice chat
                    if (!voiceRequests.containsKey(user)) voiceRequests.put(user, new ExpiringSet<>(2000));
                    if (voiceRequests.get(user).contains(targetUser)) return;
                    voiceRequests.get(user).add(targetUser);

                    // check if other has requested earlier
                    if (voiceRequests.containsKey(targetUser) && voiceRequests.get(targetUser).contains(user)) {
                        if (voiceRequests.containsKey(targetUser)) {
                            voiceRequests.get(targetUser).remove(user);
                            if (voiceRequests.get(targetUser).isEmpty()) voiceRequests.remove(targetUser);
                        }
                        if (voiceRequests.containsKey(user)) {
                            voiceRequests.get(user).remove(targetUser);
                            if (voiceRequests.get(user).isEmpty()) voiceRequests.remove(user);
                        }
                        // send each other add data
                        voicePairs.add(new String[] { user, targetUser });
                        JSONObject json = new JSONObject();
                        json.put("username", user);
                        json.put("offer", false);
                        voicePlayers.get(targetUser).sendData("EAG|VoiceAdd", json.toString().getBytes(StandardCharsets.UTF_8));
                        json.put("username", targetUser);
                        json.put("offer", true);
                        connection.sendData("EAG|VoiceAdd", json.toString().getBytes(StandardCharsets.UTF_8));
                    }
                } else if("EAG|VoiceRemove".equals(event.getTag())) {
                    if (!voicePlayers.containsKey(user)) return; // user is not using voice chat
                    String targetUser = new String(msg, StandardCharsets.UTF_8);
                    if (voicePairs.removeIf(pair -> (pair[0].equals(user) && pair[1].equals(targetUser)) || (pair[0].equals(targetUser) && pair[1].equals(user)))) voicePlayers.get(targetUser).sendData("EAG|VoiceRemove", user.getBytes(StandardCharsets.UTF_8));
                }else if("EAG|VoiceIce".equals(event.getTag())) {
                    if (!voicePlayers.containsKey(user)) return; // user is not using voice chat
                    JSONObject json = new JSONObject(new String(msg));
                    if (json.has("username") && json.get("username") instanceof String) {
                        String targetUser = json.getString("username");
                        if (checkVoicePair(user, targetUser)) {
                            if (json.has("ice_candidate")) {
                                // todo: limit ice_candidate data length or sanitize it fully
                                json.keySet().removeIf(s -> !s.equals("ice_candidate"));
                                json.put("username", user);
                                voicePlayers.get(targetUser).sendData("EAG|VoiceIce", json.toString().getBytes(StandardCharsets.UTF_8));
                            }
                        }
                    }
                }else if("EAG|VoiceDesc".equals(event.getTag())) {
                    if (!voicePlayers.containsKey(user)) return; // user is not using voice chat
                    JSONObject json = new JSONObject(new String(msg));
                    if (json.has("username") && json.get("username") instanceof String) {
                        String targetUser = json.getString("username");
                        if (checkVoicePair(user, targetUser)) {
                            if (json.has("session_description")) {
                                // todo: limit session_description data length or sanitize it fully
                                json.keySet().removeIf(s -> !s.equals("session_description"));
                                json.put("username", user);
                                voicePlayers.get(targetUser).sendData("EAG|VoiceDesc", json.toString().getBytes(StandardCharsets.UTF_8));
                            }
                        }
                    }
                }
            }catch(Throwable t) {
                // hacker
                t.printStackTrace(); // todo: remove in production
                removeUser(user);
            }
        }
    }

    @EventHandler
    public void onPostLogin(PostLoginEvent event) {
        event.getPlayer().sendData("EAG|Voice", new byte[] {  });
    }

    @EventHandler
    public void onPlayerDisconnect(PlayerDisconnectEvent event) {
        String nm = event.getPlayer().getName();
        removeUser(nm);
    }

    public void removeUser(String name) {
        voicePlayers.remove(name);
        for (String[] voicePair : voicePairs) {
            String target = null;
            if (voicePair[0].equals(name)) {
                target = voicePair[1];
            } else if(voicePair[1].equals(name)) {
                target = voicePair[0];
            }
            if (target != null && voicePlayers.containsKey(target)) voicePlayers.get(target).sendData("EAG|VoiceRemove", name.getBytes(StandardCharsets.UTF_8));
        }
        voicePairs.removeIf(pair -> pair[0].equals(name) || pair[1].equals(name));
    }

    private boolean checkVoicePair(String user1, String user2) {
        return voicePairs.stream().anyMatch(pair -> (pair[0].equals(user1) && pair[1].equals(user2)) || (pair[0].equals(user2) && pair[1].equals(user1)));
    }
}
