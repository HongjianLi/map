echo off
set YYYYMMDD=%date:~6,4%-%date:~3,2%-%date:~0,2%
set time0=%time: =0%
set datetime=%YYYYMMDD%-%time0:~0,2%-%time0:~3,2%
echo %YYYYMMDD% %time% Script started
echo %YYYYMMDD% %time% node index.js
node index.js
set PUPPETEER_EXECUTABLE_PATH=C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe
echo %YYYYMMDD% %time% cd weather
cd weather
echo %YYYYMMDD% %time% node index.js city
node index.js city
if %ERRORLEVEL% == 0 (
echo %YYYYMMDD% %time% copy city\forecast.json city\forecast\%datetime%.json
copy city\forecast.json city\forecast\%datetime%.json
)
echo %YYYYMMDD% %time% node index.js county
node index.js county
if %ERRORLEVEL% == 0 (
echo %YYYYMMDD% %time% copy county\forecast.json county\forecast\%datetime%.json
copy county\forecast.json county\forecast\%datetime%.json
)
echo %YYYYMMDD% %time% cd ..
cd ..
echo %YYYYMMDD% %time% Script completed
