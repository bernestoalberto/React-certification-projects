@echo off
for /r %%f in (*.js) do (
    echo Renaming "%%f" to "%%~nf.ts"
    ren "%%f" "%%~nf.ts"
)
echo.
echo All .js files (including those in subfolders) have been renamed to .ts.
pause