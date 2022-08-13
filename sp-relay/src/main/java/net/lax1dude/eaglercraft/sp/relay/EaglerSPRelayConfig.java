package net.lax1dude.eaglercraft.sp.relay;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class EaglerSPRelayConfig {

	private String address = "0.0.0.0";
	private int port = 6699;
	private int codeLength = 5;
	private String codeChars = "abcdefghijklmnopqrstuvwxyz0123456789$%&*+?!";
	private boolean codeMixCase = false;
	private int connectionsPerIP = 256;
	private boolean rateLimitEnable = false;
	private int rateLimitPeriod = 128;
	private int rateLimitLimit = 48;
	private int rateLimitLockoutLimit = 64;
	private int rateLimitLockoutDuration = 600;
	private String originWhitelist = "";
	private String[] originWhitelistArray = new String[0];
	private boolean enableRealIpHeader = false;
	private String serverComment = "Eags. Public LAN Relay";

	public void load(File conf) {
		if(!conf.isFile()) {
			EaglerSPRelay.logger.info("Creating config file: {}", conf.getAbsoluteFile());
			save(conf);
		}else {
			EaglerSPRelay.logger.info("Loading config file: {}", conf.getAbsoluteFile());
			boolean gotPort = false, gotCodeLength = false, gotCodeChars = false;
			boolean gotCodeMixCase = false, gotConnectionsPerIP = false;
			boolean gotRateLimitEnable = false, gotRateLimitPeriod = false;
			boolean gotRateLimitLimit = false, gotRateLimitLockoutLimit = false;
			boolean gotRateLimitLockoutDuration = false, gotOriginWhitelist = false;
			boolean gotEnableRealIpHeader = false, gotAddress = false, gotComment = false;
			Throwable t2 = null;
			try(BufferedReader reader = new BufferedReader(new FileReader(conf))) {
				String s;
				while((s = reader.readLine()) != null) {
					String[] ss = s.trim().split("=", 2);
					if(ss.length == 2) {
						if(ss[0].equalsIgnoreCase("port")) {
							try {
								port = Integer.parseInt(ss[1]);
								gotPort = true;
							}catch(Throwable t) {
								t2 = t;
								break;
							}
						}else if(ss[0].equalsIgnoreCase("address")) {
							address = ss[1];
							gotAddress = true;
						}else if(ss[0].equalsIgnoreCase("code-length")) {
							try {
								codeLength = Integer.parseInt(ss[1]);
								gotCodeLength = true;
							}catch(Throwable t) {
								EaglerSPRelay.logger.warn("Invalid code-length {} in conf {}", ss[1], conf.getAbsoluteFile());
								EaglerSPRelay.logger.warn(t);
								t2 = t;
								break;
							}
						}else if(ss[0].equalsIgnoreCase("code-chars")) {
							if(ss[1].length() < 2) {
								t2 = new IllegalArgumentException("not enough chars");
								EaglerSPRelay.logger.warn("Invalid code-chars {} in conf {}", ss[1], conf.getAbsoluteFile());
								EaglerSPRelay.logger.warn(t2);
							}else {
								codeChars = ss[1];
								gotCodeChars = true;
							}
						}else if(ss[0].equalsIgnoreCase("code-mix-case")) {
							try {
								codeMixCase = getBooleanValue(ss[1]);
								gotCodeMixCase = true;
							}catch(Throwable t) {
								EaglerSPRelay.logger.warn("Invalid code-mix-case {} in conf {}", ss[1], conf.getAbsoluteFile());
								EaglerSPRelay.logger.warn(t);
								t2 = t;
								break;
							}
						}else if(ss[0].equalsIgnoreCase("connections-per-ip")) {
							try {
								connectionsPerIP = Integer.parseInt(ss[1]);
								gotConnectionsPerIP = true;
							}catch(Throwable t) {
								EaglerSPRelay.logger.warn("Invalid connections-per-ip {} in conf {}", ss[1], conf.getAbsoluteFile());
								EaglerSPRelay.logger.warn(t);
								t2 = t;
								break;
							}
						}else if(ss[0].equalsIgnoreCase("ratelimit-enable")) {
							try {
								rateLimitEnable = getBooleanValue(ss[1]);
								gotRateLimitEnable = true;
							}catch(Throwable t) {
								EaglerSPRelay.logger.warn("Invalid rate-limit-enable {} in conf {}", ss[1], conf.getAbsoluteFile());
								EaglerSPRelay.logger.warn(t);
								t2 = t;
								break;
							}
						}else if(ss[0].equalsIgnoreCase("ratelimit-period")) {
							try {
								rateLimitPeriod = Integer.parseInt(ss[1]);
								gotRateLimitPeriod = true;
							}catch(Throwable t) {
								EaglerSPRelay.logger.warn("Invalid ratelimit-period {} in conf {}", ss[1], conf.getAbsoluteFile());
								EaglerSPRelay.logger.warn(t);
								t2 = t;
								break;
							}
						}else if(ss[0].equalsIgnoreCase("ratelimit-limit")) {
							try {
								rateLimitLimit = Integer.parseInt(ss[1]);
								gotRateLimitLimit = true;
							}catch(Throwable t) {
								EaglerSPRelay.logger.warn("Invalid ratelimit-limit {} in conf {}", ss[1], conf.getAbsoluteFile());
								EaglerSPRelay.logger.warn(t);
								t2 = t;
								break;
							}
						}else if(ss[0].equalsIgnoreCase("ratelimit-lockout-limit")) {
							try {
								rateLimitLockoutLimit = Integer.parseInt(ss[1]);
								gotRateLimitLockoutLimit = true;
							}catch(Throwable t) {
								EaglerSPRelay.logger.warn("Invalid ratelimit-lockout-limit {} in conf {}", ss[1], conf.getAbsoluteFile());
								EaglerSPRelay.logger.warn(t);
								t2 = t;
								break;
							}
						}else if(ss[0].equalsIgnoreCase("ratelimit-lockout-duration")) {
							try {
								rateLimitLockoutDuration = Integer.parseInt(ss[1]);
								gotRateLimitLockoutDuration = true;
							}catch(Throwable t) {
								EaglerSPRelay.logger.warn("Invalid ratelimit-lockout-duration {} in conf {}", ss[1], conf.getAbsoluteFile());
								EaglerSPRelay.logger.warn(t);
								t2 = t;
								break;
							}
						}else if(ss[0].equalsIgnoreCase("origin-whitelist")) {
							originWhitelist = ss[1];
							gotOriginWhitelist = true;
						}else if(ss[0].equalsIgnoreCase("enable-real-ip-header")) {
							try {
								enableRealIpHeader = getBooleanValue(ss[1]);
								gotEnableRealIpHeader = true;
							}catch(Throwable t) {
								EaglerSPRelay.logger.warn("Invalid enable-real-ip-header {} in conf {}", ss[1], conf.getAbsoluteFile());
								EaglerSPRelay.logger.warn(t);
								t2 = t;
								break;
							}
						}else if(ss[0].equalsIgnoreCase("server-comment")) {
							serverComment = ss[1];
							gotComment = true;
						}
					}
				}
			}catch(IOException t) {
				EaglerSPRelay.logger.error("Failed to load config file: {}", conf.getAbsoluteFile());
				EaglerSPRelay.logger.error(t);
			}catch(Throwable t) {
				EaglerSPRelay.logger.warn("Invalid config file: {}", conf.getAbsoluteFile());
				EaglerSPRelay.logger.warn(t);
				t2 = t;
			}
			if(t2 != null || !gotPort || !gotCodeLength || !gotCodeChars ||
					!gotCodeMixCase || !gotConnectionsPerIP || !gotRateLimitEnable ||
					!gotRateLimitPeriod || !gotRateLimitLimit || !gotRateLimitLockoutLimit ||
					!gotRateLimitLockoutDuration || !gotOriginWhitelist ||
					!gotEnableRealIpHeader || !gotAddress || !gotComment) {
				EaglerSPRelay.logger.warn("Updating config file: {}", conf.getAbsoluteFile());
				save(conf);
			}
			String[] splitted = originWhitelist.split(";");
			List<String> splittedList = new ArrayList();
			for(int i = 0; i < splitted.length; ++i) {
				splitted[i] = splitted[i].trim();
				if(splitted[i].length() > 0) {
					splittedList.add(splitted[i]);
				}
			}
			originWhitelistArray = new String[splittedList.size()];
			for(int i = 0; i < originWhitelistArray.length; ++i) {
				originWhitelistArray[i] = splittedList.get(i);
			}
		}
	}
	
	public void save(File conf) {
		try(PrintWriter w = new PrintWriter(new FileOutputStream(conf))) {
			w.println("address=" + address);
			w.println("port=" + port);
			w.println("code-length=" + codeLength);
			w.println("code-chars=" + codeChars);
			w.println("code-mix-case=" + codeMixCase);
			w.println("connections-per-ip=" + connectionsPerIP);
			w.println("ratelimit-enable=" + rateLimitEnable);
			w.println("ratelimit-period=" + rateLimitPeriod);
			w.println("ratelimit-limit=" + rateLimitLimit);
			w.println("ratelimit-lockout-limit=" + rateLimitLockoutLimit);
			w.println("ratelimit-lockout-duration=" + rateLimitLockoutDuration);
			w.println("origin-whitelist=" + originWhitelist);
			w.println("enable-real-ip-header=" + enableRealIpHeader);
			w.print("server-comment=" + serverComment);
		}catch(IOException t) {
			EaglerSPRelay.logger.error("Failed to write config file: {}", conf.getAbsoluteFile());
			EaglerSPRelay.logger.error(t);
		}
	}
	
	private static boolean getBooleanValue(String str) {
		if(str.equalsIgnoreCase("true") || str.equals("1")) {
			return true;
		}else if(str.equalsIgnoreCase("false") || str.equals("0")) {
			return false;
		}else {
			throw new IllegalArgumentException("Not a boolean: " + str);
		}
	}

	public String getAddress() {
		return address;
	}

	public int getPort() {
		return port;
	}

	public int getCodeLength() {
		return codeLength;
	}

	public String getCodeChars() {
		return codeChars;
	}

	public boolean isCodeMixCase() {
		return codeMixCase;
	}

	public int getConnectionsPerIP() {
		return connectionsPerIP;
	}

	public boolean isRateLimitEnable() {
		return rateLimitEnable;
	}

	public int getRateLimitPeriod() {
		return rateLimitPeriod;
	}

	public int getRateLimitLimit() {
		return rateLimitLimit;
	}

	public int getRateLimitLockoutLimit() {
		return rateLimitLockoutLimit;
	}

	public int getRateLimitLockoutDuration() {
		return rateLimitLockoutDuration;
	}

	public String getOriginWhitelist() {
		return originWhitelist;
	}

	public String[] getOriginWhitelistArray() {
		return originWhitelistArray;
	}

	public boolean isEnableRealIpHeader() {
		return enableRealIpHeader;
	}

	public String getComment() {
		return serverComment;
	}
	
	public String generateCode() {
		Random r = new Random();
		char[] ret = new char[codeLength];
		for(int i = 0; i < codeLength; ++i) {
			ret[i] = codeChars.charAt(r.nextInt(codeChars.length()));
			if(codeMixCase) {
				if(r.nextBoolean()) {
					ret[i] = Character.toLowerCase(ret[i]);
				}else {
					ret[i] = Character.toUpperCase(ret[i]);
				}
			}
		}
		return new String(ret);
	}
	
}
