package net.lax1dude.eaglercraft.sp.relay;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.InetSocketAddress;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import net.lax1dude.eaglercraft.sp.relay.pkt.*;

public class EaglerSPRelay extends WebSocketServer {

	public static EaglerSPRelay instance;
	public static final EaglerSPRelayConfig config = new EaglerSPRelayConfig();
	
	public static final DebugLogger logger = DebugLogger.getLogger("EaglerSPRelay");

	public static void main(String[] args) throws IOException, InterruptedException {
		for(int i = 0; i < args.length; ++i) {
			if(args[i].equalsIgnoreCase("--debug")) {
				DebugLogger.enableDebugLogging(DebugLogger.Level.DEBUG);
				logger.debug("Debug logging enabled");
			}
		}
		logger.info("Starting EaglerSPRelay version {}...", Constants.versionName);
		config.load(new File("relayConfig.ini"));
		EaglerSPRelayConfigRelayList.loadRelays(new File("relays.txt"));
		logger.info("Starting WebSocket Server...");
		instance = new EaglerSPRelay(new InetSocketAddress(config.getAddress(), config.getPort()));
		instance.setConnectionLostTimeout(20);
		instance.setReuseAddr(true);
		instance.start();
		
		Thread tickThread = new Thread((() -> {
			while(true) {
				try {
					long millis = System.currentTimeMillis();
					synchronized(pendingConnections) {
						Iterator<Entry<WebSocket,Long>> itr = pendingConnections.entrySet().iterator();
						while(itr.hasNext()) {
							Entry<WebSocket,Long> etr = itr.next();
							if(millis - etr.getValue().longValue() > 1000l) {
								etr.getKey().close();
								itr.remove();
							}
						}
					}
					synchronized(clientConnections) {
						Iterator<EaglerSPClient> itr = clientConnections.values().iterator();
						while(itr.hasNext()) {
							EaglerSPClient cl = itr.next();
							if(millis - cl.createdOn > 6000l) {
								cl.disconnect(IPacketFEDisconnectClient.TYPE_TIMEOUT, "Took too long to connect!");
							}
						}
					}
				}catch(Throwable t) {
					logger.error("Error in update loop!");
					logger.error(t);
				}
				Util.sleep(50l);
			}
		}), "Relay Tick");
		tickThread.setDaemon(true);
		tickThread.start();
		
		BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
		String s;
		while((s = reader.readLine()) != null) {
			s = s.trim();
			if(s.equalsIgnoreCase("stop") || s.equalsIgnoreCase("end")) {
				logger.info("Shutting down...");
				instance.stop();
				System.exit(0);
			}else {
				logger.info("Unknown command: {}", s);
				logger.info("Type 'stop' to exit, 'reload' to reload config");
			}
		}
		
	}
	
	private EaglerSPRelay(InetSocketAddress addr) {
		super(addr);
	}

	private static final Map<WebSocket,Long> pendingConnections = new HashMap();
	private static final Map<String,EaglerSPClient> clientIds = new HashMap();
	private static final Map<WebSocket,EaglerSPClient> clientConnections = new HashMap();
	private static final Map<String,EaglerSPServer> serverCodes = new HashMap();
	private static final Map<WebSocket,EaglerSPServer> serverConnections = new HashMap();

	@Override
	public void onStart() {
		logger.info("Listening on {}", getAddress());
		logger.info("Type 'stop' to exit");
	}
	
	@Override
	public void onOpen(WebSocket arg0, ClientHandshake arg1) {
		synchronized(pendingConnections) {
			logger.debug("[{}]: Connection opened", arg0.getRemoteSocketAddress());
			pendingConnections.put(arg0, System.currentTimeMillis());
		}
	}

	@Override
	public void onMessage(WebSocket arg0, ByteBuffer arg1) {
		DataInputStream sid = new DataInputStream(new ByteBufferInputStream(arg1));
		boolean waiting;
		synchronized(pendingConnections) {
			waiting = pendingConnections.remove(arg0) != null;
		}
		try {
			IPacket pkt = IPacket.readPacket(sid);
			if(waiting) {
				if(pkt instanceof IPacket00Handshake) {
					IPacket00Handshake ipkt = (IPacket00Handshake)pkt;
					if(ipkt.connectionVersion != Constants.protocolVersion) {
						logger.debug("[{}]: Connected with unsupported protocol version: {} (supported "
								+ "version: {})", arg0.getRemoteSocketAddress(), Constants.protocolVersion);
						if(ipkt.connectionVersion < Constants.protocolVersion) {
							arg0.send(IPacket.writePacket(new IPacketFFErrorCode(IPacketFFErrorCode.TYPE_PROTOCOL_VERSION,
									"Outdated Client! (v" + Constants.protocolVersion + " req)")));
						}else {
							arg0.send(IPacket.writePacket(new IPacketFFErrorCode(IPacketFFErrorCode.TYPE_PROTOCOL_VERSION,
									"Outdated Server! (still on v" + Constants.protocolVersion + ")")));
						}
						arg0.close();
						return;
					}
					if(ipkt.connectionType == 0x01) {
						logger.debug("[{}]: Connected as a server", arg0.getRemoteSocketAddress());
						EaglerSPServer srv;
						synchronized(serverCodes) {
							int j = 0;
							String code;
							do {
								if(++j > 100) {
									logger.error("Error: relay is running out of codes!");
									logger.error("Closing connection to {}", arg0.getRemoteSocketAddress());
									arg0.send(IPacket.writePacket(new IPacketFFErrorCode(IPacketFFErrorCode.TYPE_INTERNAL_ERROR,
											"Internal Server Error")));
									arg0.close();
									return;
								}
								code = config.generateCode();
							}while(serverCodes.containsKey(code));
							srv = new EaglerSPServer(arg0, code);
							serverCodes.put(code, srv);
							ipkt.connectionCode = code;
							arg0.send(IPacket.writePacket(ipkt));
							logger.debug("[{}][Relay -> Server] PKT 0x00: Assign join code: {}", arg0.getRemoteSocketAddress(), code);
						}
						synchronized(serverConnections) {
							serverConnections.put(arg0, srv);
						}
						srv.send(new IPacket01ICEServers(EaglerSPRelayConfigRelayList.relayServers));
						logger.debug("[{}][Relay -> Server] PKT 0x01: Send ICE server list to server", arg0.getRemoteSocketAddress());
					}else if(ipkt.connectionType == 0x02) {
						String code = ipkt.connectionCode;
						logger.debug("[{}]: Connected as a client, requested server code: {}", arg0.getRemoteSocketAddress(), code);
						if(code.length() != config.getCodeLength()) {
							logger.debug("The code '{}' is invalid because it's the wrong length, disconnecting");
							arg0.send(IPacket.writePacket(new IPacketFFErrorCode(IPacketFFErrorCode.TYPE_CODE_LENGTH,
									"The join code is the wrong length, it should be " + config.getCodeLength() + " chars long")));
							arg0.close();
						}else {
							EaglerSPServer srv;
							synchronized(serverCodes) {
								srv = serverCodes.get(code);
							}
							if(srv == null) {
								arg0.send(IPacket.writePacket(new IPacketFFErrorCode(IPacketFFErrorCode.TYPE_INCORRECT_CODE,
										"Invalid code, no LAN world found!")));
								arg0.close();
								return;
							}
							String id;
							EaglerSPClient cl;
							synchronized(clientIds) {
								int j = 0;
								do {
									id = EaglerSPClient.generateClientId();
								}while(clientIds.containsKey(id));
								cl = new EaglerSPClient(arg0, srv, id);
								clientIds.put(id, cl);
								ipkt.connectionCode = id;
								arg0.send(IPacket.writePacket(ipkt));
								srv.handleNewClient(cl);
							}
							synchronized(clientConnections) {
								clientConnections.put(arg0, cl);
							}
							cl.send(new IPacket01ICEServers(EaglerSPRelayConfigRelayList.relayServers));
							logger.debug("[{}][Relay -> Client] PKT 0x01: Send ICE server list to client", arg0.getRemoteSocketAddress());
						}
					}else {
						logger.debug("[{}]: Unknown connection type: {}", arg0.getRemoteSocketAddress(), ipkt.connectionType);
						arg0.send(IPacket.writePacket(new IPacketFFErrorCode(IPacketFFErrorCode.TYPE_ILLEGAL_OPERATION,
								"Unexpected Init Packet")));
						arg0.close();
					}
				}else {
					logger.debug("[{}]: Pending connection did not send a 0x00 packet to identify "
							+ "as a client or server", arg0.getRemoteSocketAddress());
					arg0.send(IPacket.writePacket(new IPacketFFErrorCode(IPacketFFErrorCode.TYPE_ILLEGAL_OPERATION,
							"Unexpected Init Packet")));
					arg0.close();
				}
			}else {
				EaglerSPServer srv;
				synchronized(serverConnections) {
					srv = serverConnections.get(arg0);
				}
				if(srv != null) {
					if(!srv.handle(pkt)) {
						logger.debug("[{}]: Server sent invalid packet: {}", arg0.getRemoteSocketAddress(), pkt.getClass().getSimpleName());
						arg0.send(IPacket.writePacket(new IPacketFFErrorCode(IPacketFFErrorCode.TYPE_INVALID_PACKET,
								"Invalid Packet Recieved")));
						arg0.close();
					}
				}else {
					EaglerSPClient cl;
					synchronized(clientConnections) {
						cl = clientConnections.get(arg0);
					}
					if(cl != null) {
						if(cl.handle(pkt)) {
							logger.debug("[{}]: Client sent invalid packet: {}", arg0.getRemoteSocketAddress(), pkt.getClass().getSimpleName());
							arg0.send(IPacket.writePacket(new IPacketFFErrorCode(IPacketFFErrorCode.TYPE_INVALID_PACKET,
									"Invalid Packet Recieved")));
							arg0.close();
						}
					}else {
						logger.debug("[{}]: Connection has no client/server attached to it!", arg0.getRemoteSocketAddress());
						arg0.send(IPacket.writePacket(new IPacketFFErrorCode(IPacketFFErrorCode.TYPE_ILLEGAL_OPERATION,
								"Internal Server Error")));
						arg0.close();
					}
				}
			}
		}catch(Throwable t) {
			logger.error("[{}]: Failed to handle binary frame: {}", arg0.getRemoteSocketAddress(), t);
			arg0.close();
		}
	}

	@Override
	public void onMessage(WebSocket arg0, String arg1) {
		logger.debug("[{}]: Sent a text frame, disconnecting", arg0.getRemoteSocketAddress());
		arg0.close();
	}

	@Override
	public void onClose(WebSocket arg0, int arg1, String arg2, boolean arg3) {
		EaglerSPServer srv;
		synchronized(serverConnections) {
			srv = serverConnections.remove(arg0);
		}
		if(srv != null) {
			logger.debug("[{}]: Server closed, code: {}", arg0.getRemoteSocketAddress(), srv.code);
			synchronized(serverCodes) {
				serverCodes.remove(srv.code);
			}
			ArrayList<EaglerSPClient> clientList;
			synchronized(clientConnections) {
				clientList = new ArrayList(clientConnections.values());
			}
			Iterator<EaglerSPClient> itr = clientList.iterator();
			while(itr.hasNext()) {
				EaglerSPClient cl = itr.next();
				if(cl.server == srv) {
					logger.debug("[{}]: Disconnecting client: {} (id: ", cl.socket.getRemoteSocketAddress(), cl.id);
					cl.socket.close();
				}
			}
		}else {
			EaglerSPClient cl;
			synchronized(clientConnections) {
				cl = clientConnections.remove(arg0);
			}
			if(cl != null) {
				logger.debug("[{}]: Client closed, id: {}", arg0.getRemoteSocketAddress(), cl.id);
				synchronized(clientIds) {
					clientIds.remove(cl.id);
				}
				cl.server.handleClientDisconnect(cl);
			}else {
				logger.debug("[{}]: Connection Closed: {} ", arg0.getRemoteSocketAddress());
			}
		}
	}

	@Override
	public void onError(WebSocket arg0, Exception arg1) {
		logger.error("[{}]: Exception thrown: {}", arg0.getRemoteSocketAddress(), arg1.toString());
		logger.debug(arg1);
		arg0.close();
	}

}
