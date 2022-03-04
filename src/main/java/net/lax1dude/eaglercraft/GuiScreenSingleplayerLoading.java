package net.lax1dude.eaglercraft;

import java.util.function.BooleanSupplier;

import net.minecraft.client.Minecraft;
import net.minecraft.src.GuiButton;
import net.minecraft.src.GuiMainMenu;
import net.minecraft.src.GuiScreen;

public class GuiScreenSingleplayerLoading extends GuiScreen {

	private GuiScreen menu;
	private GuiButton killTask;
	private String message;
	private BooleanSupplier checkTaskComplete;
	private Runnable taskKill;
	
	private long startStartTime;
	
	private static final Runnable defaultTerminateAction = new Runnable() {
		@Override
		public void run() {
			IntegratedServer.killWorker();
			Minecraft.getMinecraft().displayGuiScreen(new GuiMainMenu());
		}
	};
	
	public GuiScreenSingleplayerLoading(GuiScreen menu, String message, BooleanSupplier checkTaskComplete) {
		this(menu, message, checkTaskComplete, defaultTerminateAction);
	}
	
	public GuiScreenSingleplayerLoading(GuiScreen menu, String message, BooleanSupplier checkTaskComplete, Runnable onTerminate) {
		this.menu = menu;
		this.message = message;
		this.checkTaskComplete = checkTaskComplete;
		this.taskKill = onTerminate;
	}
	
	public void initGui() {
		if(startStartTime == 0) this.startStartTime = System.currentTimeMillis();
		this.buttonList.add(killTask = new GuiButton(0, this.width / 2 - 100, this.height / 3 + 50, "Kill Task"));
		killTask.enabled = false;
	}
	
	public boolean doesGuiPauseGame() {
		return false;
	}
	
	public void drawScreen(int par1, int par2, float par3) {
		this.drawDefaultBackground();
		float f = 2.0f;
		int top = this.height / 3;
		
		long millis = System.currentTimeMillis();
		
		long dots = (millis / 500l) % 4l;
		this.drawString(fontRenderer, message + (dots > 0 ? "." : "") + (dots > 1 ? "." : "") + (dots > 2 ? "." : ""), (this.width - this.fontRenderer.getStringWidth(message)) / 2, top + 10, 0xFFFFFF);
		
		long elapsed = (millis - startStartTime) / 1000l;
		if(elapsed > 3) {
			this.drawCenteredString(fontRenderer, "(" + elapsed + "s)", this.width / 2, top + 25, 0xFFFFFF);
		}
		
		super.drawScreen(par1, par2, par3);
	}
	
	public void updateScreen() {
		long millis = System.currentTimeMillis();
		if(millis - startStartTime > 6000l) {
			killTask.enabled = true;
		}
		if(checkTaskComplete.getAsBoolean()) {
			this.mc.displayGuiScreen(menu);
		}
	}

	protected void actionPerformed(GuiButton par1GuiButton) {
		if(par1GuiButton.id == 0) {
			taskKill.run();
		}
	}
	
}
