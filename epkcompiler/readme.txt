To quickly recompile the assets.epk file in /javascript, open 'run.bat' if you are on windows or open 'run_unix.sh' if you are on mac or linux

Use this tool like this:

java -jar CompilePackage.jar <source directory> <output file>

To recompile the assets.epk file found in /javascript, make your changes to the game's resources in /lwjgl-rundir/resources and then run this command within this /epkcompiler directory:

java -jar CompilePackage.jar "../lwjgl-rundir/resources" "../javascript/assets.epk"