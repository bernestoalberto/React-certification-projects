@echo off
for %%f in (*.jsx) do ren "%%f" "%%~nf.tsx"
echo Done.
pause