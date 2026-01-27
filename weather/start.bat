echo off
set d=%date%
set date=%d:~6,4%-%d:~3,2%-%d:~0,2%
set t=%time: =0%
set datetime=%date%-%t:~0,2%-%t:~3,2%
echo %date% %time% Script started
echo %date% %time% node index.js
node index.js
set PUPPETEER_EXECUTABLE_PATH=C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe
echo %date% %time% cd weather
cd weather
echo %date% %time% node index.js city
node index.js city
echo %date% %time% copy city\forecast.json city\forecast\%datetime%.json
copy city\forecast.json city\forecast\%datetime%.json
echo %date% %time% node index.js county
node index.js county
echo %date% %time% copy county\forecast.json county\forecast\%datetime%.json
copy county\forecast.json county\forecast\%datetime%.json
echo %date% %time% cd ..
cd ..
echo %date% %time% Script completed
