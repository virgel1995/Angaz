@echo off
cd node_modules/geoip-lite

set /p "key=Enter LICENSE KEY: "

npm run-script updatedb license_key=%key%
if errorlevel 1 (
   echo error
)
pause
