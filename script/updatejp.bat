@echo off

set CURRENT_DIR=%CD%
cd ..

echo start

@echo on
call "./bin/run.cmd" gen -p

@echo off
echo upload

@echo on
git add ./public
git commit -am "Update: JP"
git push origin master

@echo off
cd %CURRENT_DIR%
echo end

pause