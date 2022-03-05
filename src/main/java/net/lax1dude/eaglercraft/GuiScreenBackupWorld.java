package net.lax1dude.eaglercraft;

import net.lax1dude.eaglercraft.sp.ipc.IPCPacket05RequestData;
import net.minecraft.src.GuiButton;
import net.minecraft.src.GuiCreateWorld;
import net.minecraft.src.GuiRenameWorld;
import net.minecraft.src.GuiScreen;
import net.minecraft.src.NBTTagCompound;
import net.minecraft.src.StringTranslate;
import net.minecraft.src.WorldInfo;

public class GuiScreenBackupWorld extends GuiScreen {

	private GuiScreen selectWorld;

	private GuiButton worldRecreate = null;
	private GuiButton worldDuplicate = null;
	private GuiButton worldExport = null;
	private GuiButton worldConvert = null;
	private long worldSeed;
	private NBTTagCompound levelDat;
	
	private String worldName;
	
	public GuiScreenBackupWorld(GuiScreen selectWorld, String worldName, NBTTagCompound levelDat) {
		this.selectWorld = selectWorld;
		this.worldName = worldName;
		this.levelDat = levelDat;
		this.worldSeed = levelDat.getCompoundTag("Data").getLong("RandomSeed");
	}
	
	public void initGui() {
		StringTranslate var1 = StringTranslate.getInstance();
		this.buttonList.add(worldRecreate = new GuiButton(1, this.width / 2 - 100, this.height / 5 + 40, var1.translateKey("selectWorld.backup.recreate")));
		this.buttonList.add(worldDuplicate = new GuiButton(2, this.width / 2 - 100, this.height / 5 + 65, var1.translateKey("selectWorld.backup.duplicate")));
		this.buttonList.add(worldExport = new GuiButton(3, this.width / 2 - 100, this.height / 5 + 115, var1.translateKey("selectWorld.backup.export")));
		this.buttonList.add(worldConvert = new GuiButton(4, this.width / 2 - 100, this.height / 5 + 140, var1.translateKey("selectWorld.backup.vanilla")));
		this.buttonList.add(new GuiButton(0, this.width / 2 - 100, this.height / 4 + 160, var1.translateKey("gui.cancel")));
	}
	
	public void drawScreen(int par1, int par2, float par3) {
		StringTranslate var4 = StringTranslate.getInstance();
		this.drawDefaultBackground();

		this.drawCenteredString(this.fontRenderer, var4.translateKey("selectWorld.backup.title") + " '" + worldName + "'", this.width / 2, this.height / 5, 16777215);
		this.drawCenteredString(this.fontRenderer, var4.translateKey("selectWorld.backup.seed") + " " + worldSeed, this.width / 2, this.height / 5 + 97, 0xAAAAFF);
		
		int toolTipColor = 0xDDDDAA;
		if(worldRecreate.func_82252_a()) {
			this.drawCenteredString(this.fontRenderer, var4.translateKey("selectWorld.backup.recreate.tooltip"), this.width / 2, this.height / 5 + 20, toolTipColor);
		}else if(worldDuplicate.func_82252_a()) {
			this.drawCenteredString(this.fontRenderer, var4.translateKey("selectWorld.backup.duplicate.tooltip"), this.width / 2, this.height / 5 + 20, toolTipColor);
		}else if(worldExport.func_82252_a()) {
			this.drawCenteredString(this.fontRenderer, var4.translateKey("selectWorld.backup.export.tooltip"), this.width / 2, this.height / 5 + 20, toolTipColor);
		}else if(worldConvert.func_82252_a()) {
			this.drawCenteredString(this.fontRenderer, var4.translateKey("selectWorld.backup.vanilla.tooltip"), this.width / 2, this.height / 5 + 20, toolTipColor);
		}
		
		super.drawScreen(par1, par2, par3);
	}

	protected void actionPerformed(GuiButton par1GuiButton) {
		if(par1GuiButton.id == 0) {
			this.mc.displayGuiScreen(selectWorld);
		}else if(par1GuiButton.id == 1) {
			GuiCreateWorld cw = new GuiCreateWorld(selectWorld);
			cw.func_82286_a(new WorldInfo(this.levelDat.getCompoundTag("Data")));
			this.mc.displayGuiScreen(cw);
		}else if(par1GuiButton.id == 2) {
			this.mc.displayGuiScreen(new GuiRenameWorld(this.selectWorld, this.worldName, true));
		}else if(par1GuiButton.id == 3) {
			IntegratedServer.exportWorld(worldName, IPCPacket05RequestData.REQUEST_LEVEL_EAG);
			this.mc.displayGuiScreen(new GuiScreenSingleplayerLoading(selectWorld, "selectWorld.progress.exporting.1", () -> {
				byte[] b = IntegratedServer.getExportResponse();
				if(b != null) {
					EaglerAdapter.downloadBytes(worldName + ".epk", b);
					return true;
				}
				return false;
			}));
		}else if(par1GuiButton.id == 4) {
			this.mc.displayGuiScreen(new GuiScreenSingleplayerNotImplemented(this, "export vanilla 1.5.2 world"));
		}
	}
}
