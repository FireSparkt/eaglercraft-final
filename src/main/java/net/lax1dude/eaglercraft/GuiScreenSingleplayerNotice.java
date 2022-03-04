package net.lax1dude.eaglercraft;

import net.minecraft.src.GuiButton;
import net.minecraft.src.GuiScreen;
import net.minecraft.src.GuiSelectWorld;

public class GuiScreenSingleplayerNotice extends GuiScreen {

	private GuiScreen mainmenu;
	
	public GuiScreenSingleplayerNotice(GuiScreen mainmenu) {
		this.mainmenu = mainmenu;
	}
	
	public void initGui() {
		this.buttonList.add(new GuiButton(0, this.width / 2 - 100, this.height / 6 + 165, "I Understand"));
	}
	
	public void drawScreen(int par1, int par2, float par3) {
		this.drawDefaultBackground();
		float f = 2.0f;
		int top = this.height / 7;
		
		EaglerAdapter.glPushMatrix();
		EaglerAdapter.glScalef(f, f, f);
		this.drawCenteredString(fontRenderer, "Attention!", this.width / 4, top / 2, 0xFF0000);
		EaglerAdapter.glPopMatrix();

		this.drawCenteredString(fontRenderer, "singleplayer is still in development", this.width / 2, top + 35, 0xFFCCAA);
		this.drawCenteredString(fontRenderer, "there are still bugs and glitches", this.width / 2, top + 50, 0xFFCCAA);
		this.drawCenteredString(fontRenderer, "if you run into any issues, DO NOT REPORT", this.width / 2, top + 80, 0xFFCCAA);
		this.drawCenteredString(fontRenderer, "NOBODY WANTS TO HEAR YOUR COMPLAINTS", this.width / 2, top + 95, 0xFF5555);
		this.drawCenteredString(fontRenderer, "DO NOT OPEN ANY ISSUES ON GitHub", this.width / 2, top + 123, 0xFFCCAA);
		this.drawCenteredString(fontRenderer, "DO NOT PING LAX1DUDE OR AYUNAMI", this.width / 2, top + 136, 0xFFCCAA);
		this.drawCenteredString(fontRenderer, "DO NOT COMMENT ON YOUTUBE VIDEOS", this.width / 2, top + 149, 0xFFCCAA);
		
		super.drawScreen(par1, par2, par3);
	}

	protected void actionPerformed(GuiButton par1GuiButton) {
		if(par1GuiButton.id == 0) {
			IntegratedServer.begin();
			this.mc.displayGuiScreen(new GuiScreenSingleplayerLoading(new GuiSelectWorld(mainmenu), "starting up integrated server", () -> IntegratedServer.isReady()));
		}
	}
	
}
