#!/usr/bin/env node
import fs from 'fs/promises';
const forecastArrLength = { city: 365, county: 1592 };
const cityDir = 'city';
const dir = `${cityDir}/forecast`;
console.log(`Reading directory ${dir}`);
const files = await fs.readdir(dir);
console.log(`Found ${files.length} files`);
for (const file of files) {
	const fileParts = file.split('-');
	const fileDate = fileParts.slice(0, 3).join('-');
	const fileHH = fileParts[3];
	const forecastArr = await fs.readFile(`${dir}/${file}`).then(JSON.parse);
	console.assert(forecastArr.length >= forecastArrLength[cityDir], file, forecastArr.length);
	const { forecast } = forecastArr[0]; // Validate the first city.
	console.assert(forecast.length === 7);
	const day0 = forecast[0]; // Validate the first day.
	console.assert(day0.date === fileDate, file, day0.date);
	console.assert(fileHH < 18 ? day0.day : !day0.day, file,  'day');
}
