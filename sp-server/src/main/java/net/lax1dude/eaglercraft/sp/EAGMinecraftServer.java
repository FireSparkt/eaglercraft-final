package net.lax1dude.eaglercraft.sp;

import java.io.IOException;

import net.minecraft.server.MinecraftServer;
import net.minecraft.src.EnumGameType;
import net.minecraft.src.ILogAgent;
import net.minecraft.src.WorldSettings;

public class EAGMinecraftServer extends MinecraftServer {
	
	protected int difficulty;
	protected EnumGameType gamemode;
	protected long lastTick;
	protected WorkerListenThread listenThreadImpl;
	protected WorldSettings newWorldSettings;
	protected boolean paused;

	public EAGMinecraftServer(String world, String owner, WorldSettings currentWorldSettings) {
		super(world);
		this.setServerOwner(owner);
		this.setConfigurationManager(new EAGPlayerList(this));
		this.listenThreadImpl = new WorkerListenThread(this);
		this.newWorldSettings = currentWorldSettings;
	}
	
	public void setBaseServerProperties(int difficulty, EnumGameType gamemode) {
		this.difficulty = difficulty;
		this.gamemode = gamemode;
	}
	
	public void mainLoop() {
		if(paused) {
			return;
		}
		
		long ctm = System.currentTimeMillis();
		long delta = ctm - lastTick;
		
		if (delta > 2000L && ctm - this.timeOfLastWarning >= 15000L) {
			this.getLogAgent().func_98236_b("Can\'t keep up! Did the system time change, or is the server overloaded? Skipping " + ((delta - 2000l) / 50l) + " ticks");
			delta = 2000L;
			this.timeOfLastWarning = ctm;
		}

		if (delta < 0L) {
			this.getLogAgent().func_98236_b("Time ran backwards! Did the fucking system time change?");
			delta = 0L;
		}

		if (this.worldServers[0].areAllPlayersAsleep()) {
			this.tick();
			lastTick = ctm;
		} else {
			while (delta > 50L) {
				delta -= 50L;
				this.tick();
			}
			lastTick = System.currentTimeMillis();
		}
		
	}
	
	public void setPaused(boolean p) {
		paused = p;
	}
	
	public boolean getPaused() {
		return paused;
	}

	@Override
	protected boolean startServer() throws IOException {
		this.loadAllWorlds(folderName, "world", difficulty, newWorldSettings);
		this.lastTick = System.currentTimeMillis();
		return true;
	}

	@Override
	public boolean canStructuresSpawn() {
		return false;
	}

	@Override
	public EnumGameType getGameType() {
		return gamemode;
	}

	@Override
	public int getDifficulty() {
		return difficulty;
	}

	@Override
	public boolean isHardcore() {
		return false;
	}

	@Override
	public boolean isDedicatedServer() {
		return false;
	}

	@Override
	public boolean isCommandBlockEnabled() {
		return true;
	}

	@Override
	public WorkerListenThread getNetworkThread() {
		return listenThreadImpl;
	}

	@Override
	public String shareToLAN(EnumGameType var1, boolean var2) {
		return null;
	}

	@Override
	public ILogAgent getLogAgent() {
		return IntegratedServer.logger;
	}

}
