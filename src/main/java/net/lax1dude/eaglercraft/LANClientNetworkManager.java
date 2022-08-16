package net.lax1dude.eaglercraft;

import java.util.ArrayList;
import java.util.List;

import net.lax1dude.eaglercraft.sp.relay.pkt.IPacket;
import net.lax1dude.eaglercraft.sp.relay.pkt.IPacket00Handshake;
import net.lax1dude.eaglercraft.sp.relay.pkt.IPacket01ICEServers;
import net.lax1dude.eaglercraft.sp.relay.pkt.IPacket03ICECandidate;
import net.lax1dude.eaglercraft.sp.relay.pkt.IPacket04Description;
import net.lax1dude.eaglercraft.sp.relay.pkt.IPacketFFErrorCode;
import net.minecraft.src.INetworkManager;
import net.minecraft.src.LoadingScreenRenderer;
import net.minecraft.src.NetHandler;
import net.minecraft.src.Packet;

public class LANClientNetworkManager implements INetworkManager {

	private static final int PRE = 0, INIT = 1, SENT_ICE_CANDIDATE = 2, SENT_DESCRIPTION = 3;
	
	private static final String[] initStateNames = new String[] { "PRE", "INIT", "SENT_ICE_CANDIDATE", "SENT_DESCRIPTION" };
	
	public final String displayCode;
	public final String displayRelay;
	
	private LANClientNetworkManager(String displayCode, String displayRelay) {
		this.displayCode = displayCode;
		this.displayRelay = displayRelay;
	}
	
	public static LANClientNetworkManager connectToWorld(RelayServerSocket sock, LoadingScreenRenderer loadingScreen,
			String displayCode, String displayRelay) {
		EaglerAdapter.clearLANClientState();
		loadingScreen.displayProgressMessage("Connecting to '" + displayCode + "' via " + displayRelay + "...");
		int connectState = -1;
		IPacket pkt;
		mainLoop: while(!sock.isClosed()) {
			if((pkt = sock.readPacket()) != null) {
				if(pkt instanceof IPacket00Handshake) {
					if(connectState == PRE) {
						System.out.println("Relay [" + displayRelay + "|" + displayCode + "] recieved handshake, "
								+ "client id: " + ((IPacket00Handshake)pkt).connectionCode);
						connectState = INIT;
					}else {
						sock.close();
						System.err.println("Relay [" + displayRelay + "|" + displayCode + "] unexpected packet: "
								+ "IPacket00Handshake in state " + initStateNames[connectState]);
						return null;
					}
				}else if(pkt instanceof IPacket01ICEServers) {
					if(connectState == INIT) {
						IPacket01ICEServers ipkt = (IPacket01ICEServers) pkt;
						System.out.println("Relay [" + displayRelay + "|" + displayCode + "] provided ICE servers:");
						List<String> servers = new ArrayList();
						for(net.lax1dude.eaglercraft.sp.relay.pkt.ICEServerSet.RelayServer srv : ipkt.servers) {
							System.out.println("Relay [" + displayRelay + "|" + displayCode + "]     " + srv.type.name()
									+ ": " + srv.address);
							servers.add(srv.getICEString());
						}
						EaglerAdapter.clientLANSetICEServersAndConnect(servers.toArray(new String[servers.size()]));
						long lm = System.currentTimeMillis();
						do {
							String c = EaglerAdapter.clientLANAwaitICECandidate();
							if(c != null) {
								System.out.println("Relay [" + displayRelay + "|" + displayCode + "] client sent ICE candidate");
								sock.writePacket(new IPacket03ICECandidate("", c));
								connectState = SENT_ICE_CANDIDATE;
								continue mainLoop;
							}
						}while(System.currentTimeMillis() - lm > 3000l);
						sock.close();
						System.err.println("Relay [" + displayRelay + "|" + displayCode + "] client provide ICE candidate timeout");
						return null;
					}else {
						sock.close();
						System.err.println("Relay [" + displayRelay + "|" + displayCode + "] unexpected packet: "
								+ "IPacket01ICEServers in state " + initStateNames[connectState]);
						return null;
					}
				}else if(pkt instanceof IPacket03ICECandidate) {
					if(connectState == SENT_ICE_CANDIDATE) {
						IPacket03ICECandidate ipkt = (IPacket03ICECandidate) pkt;
						System.out.println("Relay [" + displayRelay + "|" + displayCode + "] recieved server ICE candidate");
						EaglerAdapter.clientLANSetICECandidate(ipkt.candidate);
						long lm = System.currentTimeMillis();
						do {
							String c = EaglerAdapter.clientLANAwaitDescription();
							if(c != null) {
								System.out.println("Relay [" + displayRelay + "|" + displayCode + "] client sent description");
								sock.writePacket(new IPacket04Description("", c));
								connectState = SENT_DESCRIPTION;
								continue mainLoop;
							}
						}while(System.currentTimeMillis() - lm > 3000l);
						sock.close();
						System.err.println("Relay [" + displayRelay + "|" + displayCode + "] client provide description timeout");
						return null;
					}else {
						sock.close();
						System.err.println("Relay [" + displayRelay + "|" + displayCode + "] unexpected packet: "
								+ "IPacket03ICECandidate in state " + initStateNames[connectState]);
						return null;
					}
				}else if(pkt instanceof IPacket04Description) {
					if(connectState == SENT_DESCRIPTION) {
						IPacket03ICECandidate ipkt = (IPacket03ICECandidate) pkt;
						System.out.println("Relay [" + displayRelay + "|" + displayCode + "] recieved server description");
						EaglerAdapter.clientLANSetDescription(ipkt.candidate);
						
						// TODO: handle description, return packet 05 or 06
						
					}else {
						sock.close();
						System.err.println("Relay [" + displayRelay + "|" + displayCode + "] unexpected packet: "
								+ "IPacket04Description in state " + initStateNames[connectState]);
						return null;
					}
				}else if(pkt instanceof IPacketFFErrorCode) {
					IPacketFFErrorCode ipkt = (IPacketFFErrorCode) pkt;
					System.err.println("Relay [" + displayRelay + "|" + displayCode + "] connection failed: " +
							IPacketFFErrorCode.code2string(ipkt.code) + "(" + ipkt.code + "): " + ipkt.desc);
					Throwable t;
					while((t = sock.getException()) != null) {
						t.printStackTrace();
					}
					sock.close();
					return null;
				}else {
					System.err.println("Relay [" + displayRelay + "] unexpected packet: " + pkt.getClass().getSimpleName());
					sock.close();
					return null;
				}
			}
			try {
				Thread.sleep(20l);
			} catch (InterruptedException e) {
			}
		}
		return null;
	}

	@Override
	public void setNetHandler(NetHandler var1) {
		// TODO Auto-generated method stub

	}

	@Override
	public void addToSendQueue(Packet var1) {
		// TODO Auto-generated method stub

	}

	@Override
	public void wakeThreads() {
		// TODO Auto-generated method stub

	}

	@Override
	public void processReadPackets() {
		// TODO Auto-generated method stub

	}

	@Override
	public void serverShutdown() {
		// TODO Auto-generated method stub

	}

	@Override
	public int packetSize() {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void networkShutdown(String var1, Object... var2) {
		// TODO Auto-generated method stub

	}

	@Override
	public void closeConnections() {
		// TODO Auto-generated method stub

	}

	@Override
	public String getServerURI() {
		// TODO Auto-generated method stub
		return null;
	}

}
