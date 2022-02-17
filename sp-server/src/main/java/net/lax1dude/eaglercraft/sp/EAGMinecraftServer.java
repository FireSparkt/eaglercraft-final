package net.lax1dude.eaglercraft.sp;

import java.io.File;
import java.io.IOException;

import net.minecraft.server.MinecraftServer;
import net.minecraft.src.EnumGameType;
import net.minecraft.src.ILogAgent;
import net.minecraft.src.NetworkListenThread;

public class EAGMinecraftServer extends MinecraftServer {

	public EAGMinecraftServer(File par1File) {
		super(par1File);
		// TODO Auto-generated constructor stub
	}

	@Override
	protected boolean startServer() throws IOException {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean canStructuresSpawn() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public EnumGameType getGameType() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int getDifficulty() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public boolean isHardcore() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isDedicatedServer() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isCommandBlockEnabled() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public NetworkListenThread getNetworkThread() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String shareToLAN(EnumGameType var1, boolean var2) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ILogAgent getLogAgent() {
		// TODO Auto-generated method stub
		return null;
	}

}
