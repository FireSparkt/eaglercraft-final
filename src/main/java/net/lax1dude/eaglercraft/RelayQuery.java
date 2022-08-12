package net.lax1dude.eaglercraft;

public interface RelayQuery {
	
	public static enum VersionMismatch {
		COMPATIBLE, CLIENT_OUTDATED, RELAY_OUTDATED, UNKNOWN;
		public boolean isCompatible() {
			return this == COMPATIBLE;
		}
	}

	public boolean isQueryOpen();
	public boolean isQueryFailed();
	public void close();
	
	public int getVersion();
	public String getComment();
	public String getBrand();
	public long getPing();

	public VersionMismatch getCompatible();

}
