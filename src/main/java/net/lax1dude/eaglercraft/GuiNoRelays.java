package net.lax1dude.eaglercraft;

import net.minecraft.src.GuiButton;
import net.minecraft.src.GuiScreen;
import net.minecraft.src.StringTranslate;

public class GuiNoRelays extends GuiScreen {
	
	private GuiScreen parent;
	
	public GuiNoRelays(GuiScreen parent) {
		this.parent = parent;
	}

	public void initGui() {
		StringTranslate var1 = StringTranslate.getInstance();
		buttonList.clear();
		buttonList.add(new GuiButton(0, this.width / 2 - 100, this.height / 4 - 60 + 145, var1.translateKey("gui.cancel")));
		buttonList.add(new GuiButton(1, this.width / 2 - 100, this.height / 4 - 60 + 115, var1.translateKey("directConnect.lanWorldRelay")));
	}
	
	public void drawScreen(int par1, int par2, float par3) {
		StringTranslate var4 = StringTranslate.getInstance();
		this.drawDefaultBackground();
		this.drawCenteredString(this.fontRenderer, var4.translateKey("noRelay.title"), this.width / 2, this.height / 4 - 60 + 70, 16777215);
		super.drawScreen(par1, par2, par3);
	}
	
	protected void actionPerformed(GuiButton par1GuiButton) {
		if(par1GuiButton.id == 0) {
			mc.displayGuiScreen(parent);
		}else if(par1GuiButton.id == 1) {
			mc.displayGuiScreen(new GuiScreenRelay(parent));
		}
	}
	
}
