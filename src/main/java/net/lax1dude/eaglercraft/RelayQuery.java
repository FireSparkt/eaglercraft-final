package net.lax1dude.eaglercraft;

import net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2.RateLimit;

public interface RelayQuery {
	
	public static enum VersionMismatch {
		COMPATIBLE, CLIENT_OUTDATED, RELAY_OUTDATED, UNKNOWN;
		public boolean isCompatible() {
			return this == COMPATIBLE;
		}
	}

	public boolean isQueryOpen();
	public boolean isQueryFailed();
	public RateLimit isQueryRateLimit();
	public void close();
	
	public int getVersion();
	public String getComment();
	public String getBrand();
	public long getPing();

	public VersionMismatch getCompatible();

}
