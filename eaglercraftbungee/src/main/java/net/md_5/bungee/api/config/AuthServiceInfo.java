package net.md_5.bungee.api.config;

import java.util.List;

public class AuthServiceInfo {

	private final boolean enabled;
	private final String authfile;
	private final int ipLimit;
	private final List<String> joinMessages;
	
	public AuthServiceInfo(boolean enabled, String authfile, int timeout, List<String> joinMessages) {
		this.enabled = enabled;
		this.authfile = authfile;
		this.ipLimit = timeout;
		this.joinMessages = joinMessages;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public String getAuthfile() {
		return authfile;
	}

	public int getIpLimit() {
		return ipLimit;
	}

	public List<String> getJoinMessages() {
		return joinMessages;
	}

}
