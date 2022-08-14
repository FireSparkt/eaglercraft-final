package net.lax1dude.eaglercraft;

import java.util.List;

import net.lax1dude.eaglercraft.adapter.EaglerAdapterImpl2.RateLimit;
import net.lax1dude.eaglercraft.sp.relay.pkt.IPacket07LocalWorlds.LocalWorld;

public interface RelayWorldsQuery {

	public boolean isQueryOpen();
	public boolean isQueryFailed();
	public RateLimit isQueryRateLimit();
	public void close();
	
	public List<LocalWorld> getWorlds();
	
}
