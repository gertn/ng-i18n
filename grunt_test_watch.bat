@echo off

rem sets the basedir to the directory where this batch file is located

set BASE_DIR=%~dp0

grunt test-watch
