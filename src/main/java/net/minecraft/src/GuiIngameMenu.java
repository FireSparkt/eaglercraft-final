package net.minecraft.src;

import net.lax1dude.eaglercraft.AbortedException;
import net.lax1dude.eaglercraft.ConfigConstants;
import net.lax1dude.eaglercraft.EaglerAdapter;
import net.lax1dude.eaglercraft.GuiScreenSkinCapeSettings;
import net.lax1dude.eaglercraft.GuiVoiceMenu;
import net.lax1dude.eaglercraft.IntegratedServer;
import net.lax1dude.eaglercraft.IntegratedServerLAN;
import net.minecraft.client.Minecraft;

public class GuiIngameMenu extends GuiScreen {

	private GuiVoiceMenu voiceMenu;

	public GuiIngameMenu() {
		voiceMenu = new GuiVoiceMenu(this);
	}
	
	/**
	 * Adds the buttons (and other controls) to the screen in question.
	 */
	public void initGui() {
		this.buttonList.clear();
		byte var1 = -16;
		this.buttonList.add(new GuiButton(1, this.width / 2 - 100, this.height / 4 + 120 + var1, StatCollector.translateToLocal("menu.returnToMenu")));

		if (!this.mc.isIntegratedServerRunning()) {
			((GuiButton) this.buttonList.get(0)).displayString = StatCollector.translateToLocal("menu.disconnect");
		}

		this.buttonList.add(new GuiButton(4, this.width / 2 - 100, this.height / 4 + 24 + var1, StatCollector.translateToLocal("menu.returnToGame")));
		this.buttonList.add(new GuiButton(0, this.width / 2 - 100, this.height / 4 + 96 + var1, 98, 20, StatCollector.translateToLocal("menu.options")));
		GuiButton var3;
		this.buttonList.add(var3 = new GuiButton(7, this.width / 2 + 2, this.height / 4 + 96 + var1, 98, 20, StatCollector.translateToLocal(IntegratedServerLAN.isHostingLAN() ? "menu.closeLan" : "menu.shareToLan")));
		var3.enabled = mc.isSingleplayer();
		this.buttonList.add(new GuiButton(8, 3, 3, 120, 20, StatCollector.translateToLocal("menu.skinCapeSettings")));
	}

	/**
	 * Fired when a control is clicked. This is the equivalent of
	 * ActionListener.actionPerformed(ActionEvent e).
	 */
	protected void actionPerformed(GuiButton par1GuiButton) {
		switch (par1GuiButton.id) {
		case 0:
			this.mc.displayGuiScreen(new GuiOptions(this, this.mc.gameSettings));
			break;

		case 1:
			par1GuiButton.enabled = false;
			this.mc.theWorld.sendQuittingDisconnectingPacket();
			this.mc.loadWorld((WorldClient) null);
			this.mc.stopServerAndDisplayGuiScreen(new GuiMainMenu());

		case 2:
		case 3:
		default:
			break;

		case 4:
			this.mc.displayGuiScreen((GuiScreen) null);
			this.mc.setIngameFocus();
			this.mc.sndManager.resumeAllSounds();
			break;

		case 7:
			if (IntegratedServerLAN.isHostingLAN()) {
				IntegratedServerLAN.closeLAN();
				this.mc.displayGuiScreen((GuiScreen) null);
				this.mc.setIngameFocus();
				this.mc.sndManager.resumeAllSounds();
			} else {
				this.mc.displayGuiScreen(new GuiShareToLan(this));
			}
			break;
			
		case 8:
			this.mc.displayGuiScreen(new GuiScreenSkinCapeSettings(this));
			break;
		}
	}

	/**
	 * Called from the main game loop to update the screen.
	 */
	public void updateScreen() {
		super.updateScreen();
		if(!mc.isSingleplayer()) {
			voiceMenu.updateScreen();
		}
	}

	/**
	 * Draws the screen and all the components in it.
	 */
	public void drawScreen(int par1, int par2, float par3) {
		this.drawDefaultBackground();
		this.drawCenteredString(this.fontRenderer, "Game menu", this.width / 2, 40, 16777215);
		super.drawScreen(par1, par2, par3);
		if(par1 >= 3 && par1 < 123 && par2 >= 3 && par2 < 23) {
			int c = 0xCCCC66;
			StringTranslate var1 = StringTranslate.getInstance();
			EaglerAdapter.glPushMatrix();
			EaglerAdapter.glTranslatef(126.0f, 6.0f, 0.0f);
			EaglerAdapter.glScalef(0.8f, 0.8f, 0.8f);
			this.drawString(fontRenderer, var1.translateKey("menu.skinCapeSettingsNote0"), 0, 0, c);
			this.drawString(fontRenderer, var1.translateKey("menu.skinCapeSettingsNote1"), 0, 9, c);
			EaglerAdapter.glPopMatrix();
		}
		
		drawString(fontRenderer, "Eaglercraft: " + ConfigConstants.version, 6, 27, 0x999999);
		
		try {
			if(!mc.isSingleplayer()) {
				if(voiceMenu.isBlockingInput()) {
					super.drawScreen(0, 0, par3);
				}else {
					super.drawScreen(par1, par2, par3);
				}
				voiceMenu.drawScreen(par1, par2, par3);
			}else {
				super.drawScreen(par1, par2, par3);
			}
		}catch(AbortedException ex) {
		}
		
	}
	
	/**
	 * Fired when a key is typed. This is the equivalent of
	 * KeyListener.keyTyped(KeyEvent e).
	 */
	protected void keyTyped(char par1, int par2) {
		try {
			if(!mc.isSingleplayer()) {
				voiceMenu.keyTyped(par1, par2);
			}
			super.keyTyped(par1, par2);
		}catch(AbortedException ex) {
		}
	}
	
	/**
	 * Called when the mouse is clicked.
	 */
	protected void mouseClicked(int par1, int par2, int par3) {
		try {
			if(!mc.isSingleplayer()) {
				voiceMenu.mouseClicked(par1, par2, par3);
			}
			super.mouseClicked(par1, par2, par3);
		}catch(AbortedException ex) {
		}
	}
	
	public void setWorldAndResolution(Minecraft par1Minecraft, int par2, int par3) {
		super.setWorldAndResolution(par1Minecraft, par2, par3);
		voiceMenu.setWorldAndResolution(par1Minecraft, par2, par3);
	}
	
	protected void mouseMovedOrUp(int par1, int par2, int par3) {
		try {
			if(!mc.isSingleplayer()) {
				voiceMenu.mouseMovedOrUp(par1, par2, par3);
			}
			super.mouseMovedOrUp(par1, par2, par3);
		}catch(AbortedException ex) {
		}
	}
	
}
