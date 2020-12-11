echo off

set CURRENT_DIR=%CD%
cd ..
@echo on

call "./bin/run.cmd" gen -p
git add ./public
git commit -am ""
git push origin master

@echo off

cd %CURRENT_DIR%
pause