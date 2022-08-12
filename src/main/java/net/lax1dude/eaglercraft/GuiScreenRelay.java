package net.lax1dude.eaglercraft;

import net.minecraft.client.Minecraft;
import net.minecraft.src.Gui;
import net.minecraft.src.GuiButton;
import net.minecraft.src.GuiScreen;
import net.minecraft.src.StringTranslate;

public class GuiScreenRelay extends GuiScreen {
	
	private final GuiScreen screen;
	private GuiSlotRelay slots;
	private boolean hasPinged;
	int selected;

	private GuiButton addRelay;
	private GuiButton deleteRelay;
	private GuiButton setPrimary;
	private GuiButton refresh;
	private GuiButton loadDefault;
	
	private String tooltipString = null;
	
	public GuiScreenRelay(GuiScreen screen) {
		this.screen = screen;
	}
	
	public void initGui() {
		selected = -1;
		StringTranslate var1 = StringTranslate.getInstance();
		buttonList.clear();
		buttonList.add(new GuiButton(0, this.width / 2 + 54, this.height - 28, 100, 20, var1.translateKey("gui.cancel")));
		buttonList.add(addRelay = new GuiButton(1, this.width / 2 - 154, this.height - 52, 100, 20, var1.translateKey("networkSettings.add")));
		buttonList.add(deleteRelay = new GuiButton(2, this.width / 2 - 50, this.height - 52, 100, 20, var1.translateKey("networkSettings.delete")));
		buttonList.add(setPrimary = new GuiButton(3, this.width / 2 + 54, this.height - 52, 100, 20, var1.translateKey("networkSettings.default")));
		buttonList.add(refresh = new GuiButton(4, this.width / 2 - 50, this.height - 28, 100, 20, var1.translateKey("networkSettings.refresh")));
		buttonList.add(loadDefault = new GuiButton(5, this.width / 2 - 154, this.height - 28, 100, 20, var1.translateKey("networkSettings.loadDefaults")));
		updateButtons();
		this.slots = new GuiSlotRelay(this);
		if(!hasPinged) {
			hasPinged = true;
			slots.relayManager.ping();
		}
	}
	
	void updateButtons() {
		if(selected < 0) {
			addRelay.enabled = false;
			deleteRelay.enabled = false;
			setPrimary.enabled = false;
			loadDefault.enabled = false;
		}else {
			addRelay.enabled = true;
			deleteRelay.enabled = true;
			setPrimary.enabled = true;
			loadDefault.enabled = true;
		}
	}
	
	public void actionPerformed(GuiButton btn) {
		if(btn.id == 0) {
			mc.displayGuiScreen(screen);
		} else if(btn.id == 4) {
			slots.relayManager.ping();
		} else if(btn.id == 3) {
			if(selected >= 0) {
				slots.relayManager.setPrimary(selected);
				selected = 0;
			}
		}
	}
	
	public void updateScreen() {
		slots.relayManager.update();
	}
	
	private int mx = 0;
	private int my = 0;
	
	int getFrameMouseX() {
		return mx;
	}
	
	int getFrameMouseY() {
		return my;
	}

	public void drawScreen(int par1, int par2, float par3) {
		drawDefaultBackground();
		StringTranslate var4 = StringTranslate.getInstance();
		
		mx = par1;
		my = par2;
		slots.drawScreen(par1, par2, par3);
		
		if(tooltipString != null) {
			int ww = mc.fontRenderer.getStringWidth(tooltipString);
			Gui.drawRect(par1 + 1, par2 - 14, par1 + ww + 7, par2 - 2, 0xC0000000);
			screen.drawString(mc.fontRenderer, tooltipString, par1 + 4, par2 - 12, 0xFF999999);
			tooltipString = null;
		}
		
		this.drawCenteredString(this.fontRenderer, var4.translateKey("networkSettings.title"), this.width / 2, 16, 16777215);
		super.drawScreen(par1, par2, par3);
	}
	
	void setToolTip(String str) {
		tooltipString = str;
	}
	
	static Minecraft getMinecraft(GuiScreenRelay screen) {
		return screen.mc;
	}

}
