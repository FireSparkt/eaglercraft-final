package net.minecraft.src;

public class ChatAllowedCharacters {
	/**
	 * This String have the characters allowed in any text drawing of minecraft.
	 */
	public static final String allowedCharacters = getAllowedCharacters();

	/**
	 * Array of the special characters that are allowed in any text drawing of
	 * Minecraft.
	 */
	public static final char[] allowedCharactersArray = new char[] { '/', '\n', '\r', '\t', '\u0000', '\f', '`', '?',
			'*', '\\', '<', '>', '|', '\"', ':' };

	/**
	 * Load the font.txt resource file, that is on UTF-8 format. This file contains
	 * the characters that minecraft can render Strings on screen.
	 */
	private static String getAllowedCharacters() {
		return  "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_'abcdefghijklmnopqrstuvwxyz{|}~\u2302" +
						"\u00c7\u00fc\u00e9\u00e2\u00e4\u00e0\u00e5\u00e7\u00ea\u00eb\u00e8\u00ef\u00ee\u00ec\u00c4\u00c5" +
						"\u00c9\u00e6\u00c6\u00f4\u00f6\u00f2\u00fb\u00f9\u00ff\u00d6\u00dc\u00f8\u00a3\u00d8\u00d7\u0192" +
						"\u00e1\u00ed\u00f3\u00fa\u00f1\u00d1\u00aa\u00ba\u00bf\u00ae\u00ac\u00bd\u00bc\u00a1\u00ab\u00bb";
	}

	public static final boolean isAllowedCharacter(char par0) {
		return par0 != 167 && (allowedCharacters.indexOf(par0) >= 0 || par0 > 32);
	}

	/**
	 * Filter string by only keeping those characters for which isAllowedCharacter()
	 * returns true.
	 */
	public static String filerAllowedCharacters(String par0Str) {
		StringBuilder var1 = new StringBuilder();
		char[] var2 = par0Str.toCharArray();
		int var3 = var2.length;

		for (int var4 = 0; var4 < var3; ++var4) {
			char var5 = var2[var4];

			if (isAllowedCharacter(var5)) {
				var1.append(var5);
			}
		}

		return var1.toString();
	}
}
