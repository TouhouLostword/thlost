@echo off

set CURRENT_DIR=%CD%
cd ..
@echo on

echo "start gen\n"
call "./bin/run.cmd" gen -p
echo "upload\n"
git add ./public
git commit -am "Update: JP"
git push origin master

@echo off

cd %CURRENT_DIR%
pause