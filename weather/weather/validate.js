#!/usr/bin/env node
import fs from 'fs/promises';
const conditions = {
	city: {
		forecastArrLength: { min: 356 },
		cityLength: { min: 2, max: 5 },
	},
	county: {
		forecastArrLength: { min: 1584 },
		cityLength: { min: 4, max: 6 },
	},
};
for (const cityDir of ['city', 'county']) {
	const dir = `${cityDir}/forecast`;
	console.log(`Reading directory ${dir}`);
	const files = await fs.readdir(dir);
	console.log(`Found ${files.length} files`);
	const condition = conditions[cityDir];
	for (const file of files) {
		const fileParts = file.split('-');
		const fileDate = fileParts.slice(0, 3).join('-');
		const fileHH = fileParts[3];
		const forecastArr = await fs.readFile(`${dir}/${file}`).then(JSON.parse);
		console.assert(forecastArr.length >= condition.forecastArrLength.min, file, forecastArr.length);
		forecastArr.forEach(f => {
			const { city } = f;
			console.assert(city.length >= condition.cityLength.min, file, city, city.length);
			console.assert(city.length <= condition.cityLength.max, file, city, city.length);
		});
		const { forecast } = forecastArr[forecastArr.length - 1]; // Validate the last city.
		console.assert(forecast.length === 7);
		const day0 = forecast[0]; // Validate the first day.
		console.assert(day0.date === fileDate, file, day0.date);
		console.assert(fileHH < 18 ? day0.day : !day0.day, file,  'day');
	}
}
