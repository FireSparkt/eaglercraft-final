package net.md_5.bungee.api.config;

public class AuthServiceInfo {

	private final boolean enabled;
	private final String authfile;
	private final int ipLimit;
	
	public AuthServiceInfo(boolean enabled, String authfile, int timeout) {
		this.enabled = enabled;
		this.authfile = authfile;
		this.ipLimit = timeout;
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

}
