package net.md_5.bungee.eaglercraft;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

import net.md_5.bungee.BungeeCord;
import net.md_5.bungee.api.config.ConfigurationAdapter;

public class DomainBlacklist {

	public static final Collection<Pattern> regexBlacklist = new ArrayList();
	public static final Collection<Pattern> regexLocalBlacklist = new ArrayList();
	public static final Collection<Pattern> regexBlacklistReplit = new ArrayList();
	public static final File localBlacklist = new File("origin_blacklist.txt");
	private static Collection<String> blacklistSubscriptions = null;
	private static boolean blockOfflineDownload = false;
	private static boolean blockAllReplits = false;
	private static final HashSet<String> brokenURLs = new HashSet();
	private static final HashSet<String> brokenRegex = new HashSet();

	public static final HashSet<String> regexBlacklistReplitInternalStrings = new HashSet();
	public static final Collection<Pattern> regexBlacklistReplitInternal = new ArrayList();
	
	static {
		regexBlacklistReplitInternalStrings.add(".*repl(it)?\\..{1,5}$");
		for(String s : regexBlacklistReplitInternalStrings) {
			regexBlacklistReplitInternal.add(Pattern.compile(s));
		}
	}

	private static int updateRate = 15 * 60 * 1000;
	private static long lastLocalUpdate = 0l;
	private static long lastUpdate = 0;
	
	public static boolean test(String origin) {
		synchronized(regexBlacklist) {
			if(blockOfflineDownload && origin.equalsIgnoreCase("null")) {
				return true;
			}
			if(blockAllReplits) {
				for(Pattern m : regexBlacklistReplitInternal) {
					if(m.matcher(origin).matches()) {
						return true;
					}
				}
				for(Pattern m : regexBlacklistReplit) {
					if(m.matcher(origin).matches()) {
						return true;
					}
				}
			}
			for(Pattern m : regexBlacklist) {
				if(m.matcher(origin).matches()) {
					return true;
				}
			}
			for(Pattern m : regexLocalBlacklist) {
				if(m.matcher(origin).matches()) {
					return true;
				}
			}
		}
		return false;
	}
	
	public static void init(BungeeCord bg) {
		synchronized(regexBlacklist) {
			brokenURLs.clear();
			brokenRegex.clear();
			regexBlacklist.clear();
			regexLocalBlacklist.clear();
			regexBlacklistReplit.clear();
			ConfigurationAdapter cfg = bg.getConfigurationAdapter();
			blacklistSubscriptions = cfg.getBlacklistURLs();
			blockOfflineDownload = cfg.getBlacklistOfflineDownload();
			blockAllReplits = cfg.getBlacklistReplits();
			lastLocalUpdate = 0l;
			lastUpdate = System.currentTimeMillis() - updateRate - 1000l;
			update();
		}
	}
	
	public static void update() {
		long ct = System.currentTimeMillis();
		if((int)(ct - lastUpdate) > updateRate) {
			lastUpdate = ct;
			synchronized(regexBlacklist) {
				if(blacklistSubscriptions != null) {
					ArrayList<Pattern> newBlacklist = new ArrayList();
					ArrayList<Pattern> newReplitBlacklist = new ArrayList();
					HashSet<String> newBlacklistSet = new HashSet();
					newBlacklistSet.addAll(regexBlacklistReplitInternalStrings);
					for(String str : blacklistSubscriptions) {
						try {
							URL u;
							try {
								u = new URL(str);
							}catch(MalformedURLException e) {
								if(brokenURLs.add(str)) {
									System.err.println("ERROR: the blacklist subscription URL '" + str + "' is invalid");
								}
								continue;
							}
							URLConnection cc = u.openConnection();
							if(cc instanceof HttpURLConnection) {
								HttpURLConnection ccc = (HttpURLConnection)cc;
								ccc.setRequestProperty("Accept", "text/plain,text/html,application/xhtml+xml,application/xml");
								ccc.setRequestProperty("User-Agent", "Mozilla/5.0 EaglercraftBungee/" + EaglercraftBungee.version);
							}
							cc.connect();
							BufferedReader is = new BufferedReader(new InputStreamReader(cc.getInputStream()));
							String firstLine = is.readLine();
							if(firstLine == null) {
								is.close();
								throw new IOException("Could not read line");
							}
							firstLine = firstLine.trim();
							if(!firstLine.startsWith("#") || !firstLine.substring(1).trim().toLowerCase().startsWith("eaglercraft domain blacklist")) {
								throw new IOException("File does not contain a list of domains");
							}
							String ss;
							while((ss = is.readLine()) != null) {
								if((ss = ss.trim()).length() > 0) {
									if(ss.startsWith("#")) {
										ss = ss.substring(1).trim();
										if(ss.startsWith("replit-wildcard:")) {
											ss = ss.substring(16).trim();
											if(newBlacklistSet.add(ss)) {
												try {
													newReplitBlacklist.add(Pattern.compile(ss));
												}catch(PatternSyntaxException shit) {
													if(brokenRegex.add(ss)) {
														System.err.println("ERROR: the blacklist replit wildcard regex '" + ss + "' is invalid");
														continue;
													}
												}
												brokenRegex.remove(ss);
											}
										}
										continue;
									}
									if(newBlacklistSet.add(ss)) {
										try {
											newBlacklist.add(Pattern.compile(ss));
										}catch(PatternSyntaxException shit) {
											if(brokenRegex.add(ss)) {
												System.err.println("ERROR: the blacklist regex '" + ss + "' is invalid");
												continue;
											}
										}
										brokenRegex.remove(ss);
									}
								}
							}
							is.close();
							brokenURLs.remove(str);
						}catch(Throwable t) {
							if(brokenURLs.add(str)) {
								System.err.println("ERROR: the blacklist subscription URL '" + str + "' is invalid");
							}
							t.printStackTrace();
						}
					}
					if(!newBlacklist.isEmpty()) {
						regexBlacklist.clear();
						regexBlacklist.addAll(newBlacklist);
					}
					if(!newReplitBlacklist.isEmpty()) {
						regexBlacklistReplit.clear();
						regexBlacklistReplit.addAll(newReplitBlacklist);
					}
				}else {
					brokenURLs.clear();
					brokenRegex.clear();
					regexBlacklist.clear();
					lastLocalUpdate = 0l;
				}
			}
		}
		if(localBlacklist.exists()) {
			long lastLocalEdit = localBlacklist.lastModified();
			if(lastLocalEdit != lastLocalUpdate) {
				lastLocalUpdate = lastLocalEdit;
				synchronized(regexBlacklist) {
					try {
						BufferedReader is = new BufferedReader(new FileReader(localBlacklist));
						regexLocalBlacklist.clear();
						String ss;
						while((ss = is.readLine()) != null) {
							try {
								if((ss = ss.trim()).length() > 0) {
									regexLocalBlacklist.add(Pattern.compile(ss));
								}
							}catch(PatternSyntaxException shit) {
								System.err.println("ERROR: the local blacklist regex '" + ss + "' is invalid");
							}
						}
						is.close();
						System.out.println("Reloaded '" + localBlacklist.getName() + "'.");
					}catch(IOException ex) {
						regexLocalBlacklist.clear();
						System.err.println("ERROR: failed to read local blacklist file '" + localBlacklist.getName() + "'");
						ex.printStackTrace();
					}
				}
			}
		}else {
			synchronized(regexBlacklist) {
				if(!regexLocalBlacklist.isEmpty()) {
					System.err.println("WARNING: the blacklist file '" + localBlacklist.getName() + "' has been deleted");
				}
				regexLocalBlacklist.clear();
			}
		}
	}

	public static void addLocal(String o) {
		String p = "^" + Pattern.quote(o.trim()) + "$";
		ArrayList<String> lines = new ArrayList();
		if(localBlacklist.exists()) {
			try {
				BufferedReader is = new BufferedReader(new FileReader(localBlacklist));
				String ss;
				while((ss = is.readLine()) != null) {
					if((ss = ss.trim()).length() > 0) {
						lines.add(ss);
					}
				}
				is.close();
			}catch(IOException ex) {
				// ?
			}
		}
		if(!lines.contains(p)) {
			lines.add(p);
			try {
				PrintWriter os = new PrintWriter(new FileWriter(localBlacklist));
				for(String s : lines) {
					os.println(s);
				}
				os.close();
				lastLocalUpdate = 0l;
				update();
			}catch(IOException ex) {
				// ?
			}
		}
	}

	public static boolean removeLocal(String o) {
		String p = "^" + Pattern.quote(o.trim()) + "$";
		ArrayList<String> lines = new ArrayList();
		if(localBlacklist.exists()) {
			try {
				BufferedReader is = new BufferedReader(new FileReader(localBlacklist));
				String ss;
				while((ss = is.readLine()) != null) {
					if((ss = ss.trim()).length() > 0) {
						lines.add(ss);
					}
				}
				is.close();
			}catch(IOException ex) {
				// ?
			}
		}
		if(lines.contains(p)) {
			lines.remove(p);
			try {
				PrintWriter os = new PrintWriter(new FileWriter(localBlacklist));
				for(String s : lines) {
					os.println(s);
				}
				os.close();
				lastLocalUpdate = 0l;
				update();
				return true;
			}catch(IOException ex) {
				System.err.println("Failed to save '" + localBlacklist.getName() + "'");
				ex.printStackTrace();
			}
		}
		return false;
	}

}
