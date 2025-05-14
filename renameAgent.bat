@echo off
for %%f in (*.js) do ren "%%f" "%%~nf.ts"
echo Done.
pause