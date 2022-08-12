package net.lax1dude.eaglercraft;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

import net.minecraft.src.NBTBase;
import net.minecraft.src.NBTTagCompound;
import net.minecraft.src.NBTTagList;

public class RelayManager {
	
	private final List<RelayServer> relays = new ArrayList();
	private long lastPingThrough = 0l;
	
	public RelayManager() {
		relays.add(new RelayServer("wss://addr1/", "relay #1", true));
		relays.add(new RelayServer("wss://addr2/", "relay #2", false));
		relays.add(new RelayServer("wss://addr3/", "relay #3", false));
	}
	
	public void load(NBTTagList relayConfig) {
		relays.clear();
		if(relayConfig.tagCount() > 0) {
			boolean gotAPrimary = false;
			for(int i = 0, l = relayConfig.tagCount(); i < l; ++i) {
				NBTBase relay = relayConfig.tagAt(l);
				if(relay instanceof NBTTagCompound) {
					NBTTagCompound relayee = (NBTTagCompound) relay;
					boolean p = relayee.getBoolean("primary");
					if(p) {
						if(gotAPrimary) {
							p = false;
						}else {
							gotAPrimary = true;
						}
					}
					relays.add(new RelayServer(relayee.getString("addr"), relayee.getString("comment"), p));
				}
			}
		}
		if(relays.size() == 0) {
			for(int i = 0, l = ConfigConstants.relays.size(); i < l; ++i) {
				relays.add(new RelayServer(ConfigConstants.relays.get(i)));
			}
		}
		sort();
	}
	
	private void sort() {
		if(relays.size() == 0) {
			return;
		}
		int j = -1;
		for(int i = 0, l = relays.size(); i < l; ++i) {
			if(relays.get(i).isPrimary()) {
				if(j == -1) {
					j = i;
				}else {
					relays.get(i).setPrimary(false);
				}
			}
		}
		if(j == -1) {
			boolean found = false;
			for(int i = 0, l = relays.size(); i < l; ++i) {
				RelayServer srv = relays.get(i);
				if(srv.getPing() > 0l) {
					found = true;
					srv.setPrimary(true);
					break;
				}
			}
			if(!found) {
				relays.get(0).setPrimary(true);
			}
		}else {
			RelayServer srv = relays.remove(j);
			relays.add(0, srv);
		}
	}
	
	public void ping() {
		lastPingThrough = System.currentTimeMillis();
		for(int i = 0, l = relays.size(); i < l; ++i) {
			relays.get(i).ping();
		}
	}
	
	public void update() {
		for(int i = 0, l = relays.size(); i < l; ++i) {
			relays.get(i).update();
		}
	}
	
	public void close() {
		for(int i = 0, l = relays.size(); i < l; ++i) {
			relays.get(i).close();
		}
	}
	
	public int count() {
		return relays.size();
	}
	
	public RelayServer get(int idx) {
		return relays.get(idx);
	}
	
	public void add(String addr, String comment, boolean primary) {
		lastPingThrough = 0l;
		int i = relays.size();
		relays.add(new RelayServer(addr, comment, false));
		if(primary) {
			setPrimary(i);
		}
	}

	public void setPrimary(int idx) {
		if(idx >= 0 && idx < relays.size()) {
			for(int i = 0, l = relays.size(); i < l; ++i) {
				RelayServer srv = relays.get(i);
				if(srv.isPrimary()) {
					srv.setPrimary(false);
				}
			}
			RelayServer pr = relays.remove(idx);
			pr.setPrimary(true);
			relays.add(0, pr);
		}
	}
	
	public void remove(int idx) {
		RelayServer srv = relays.remove(idx);
		srv.close();
		sort();
	}
	
	public RelayServer getPrimary() {
		if(relays.size() > 0) {
			for(int i = 0, l = relays.size(); i < l; ++i) {
				RelayServer srv = relays.get(i);
				if(srv.isPrimary()) {
					return srv;
				}
			}
			sort();
			return getPrimary();
		}else {
			return null;
		}
	}
	
	public RelayServer getWorkingRelay(Consumer<String> progressCallback) {
		if(relays.size() > 0) {
			long millis = System.currentTimeMillis();
			if(millis - lastPingThrough > 10000l) {
				RelayServer relay = getPrimary();
				if(relay.getPing() > 0l && relay.getPingCompatible().isCompatible()) {
					return relay;
				}
				for(int i = 0, l = relays.size(); i < l; ++i) {
					RelayServer relayEtr = relays.get(i);
					if(relayEtr != relay) {
						if(relayEtr.getPing() > 0l && relayEtr.getPingCompatible().isCompatible()) {
							return relayEtr;
						}
					}
				}
			}
			return getWorkingRelayActive(progressCallback);
		}else {
			return null;
		}
	}
	
	private RelayServer getWorkingRelayActive(Consumer<String> progressCallback) {
		if(relays.size() > 0) {
			RelayServer relay = getPrimary();
			progressCallback.accept(relay.address);
			relay.pingBlocking();
			if(relay.getPing() > 0l && relay.getPingCompatible().isCompatible()) {
				return relay;
			}
			for(int i = 0, l = relays.size(); i < l; ++i) {
				RelayServer relayEtr = relays.get(i);
				if(relayEtr != relay) {
					progressCallback.accept(relayEtr.address);
					relayEtr.pingBlocking();
					if(relayEtr.getPing() > 0l && relayEtr.getPingCompatible().isCompatible()) {
						return relayEtr;
					}
				}
			}
			return null;
		}else {
			return null;
		}
	}
	
}
