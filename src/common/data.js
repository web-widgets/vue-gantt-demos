export const weekScaleTemplate = (a, b) => {
	return `${a.getMonth()} - ${b.getMonth()}`;
};

export const dayStyle = a => {
	return a.getDay() == 5 ? "sday" : "";
};

export const complexScales = [
	{ unit: "year", step: 1, format: "yyyy" },
	{ unit: "month", step: 2, format: "MMMM yyy" },
	{ unit: "week", step: 1, format: "w" },
	{ unit: "day", step: 1, format: "d", css: dayStyle },
];

export const simpleColumns = [
	{ name: "text", label: "Task name", width: "100%" },
];

export function getData(prefix, maxSize, maxYears) {
	maxYears = maxYears || 100;
	maxSize = maxSize || 50;
	prefix = prefix || "";
	const tasks = [];
	for (let i = 1; i <= maxSize; i++) {
		const ii = i % (365 * maxYears);

		let start = 2 + ii - (ii >= 13 ? 12 : 0);
		let end = start + 1 + Math.round(Math.random() * 2);
		tasks.push({
			id: i,
			start_date: new Date(2020, 2, start),
			end_date: new Date(2020, 2, end),
			text: prefix + "Task " + i,
			progress: Math.round((100 * i) / maxSize),
			parent: 0,
			type: "task",
		});
	}

	tasks[3].parent = 3;
	tasks[4].parent = 3;
	tasks[5].parent = 3;
	tasks[6].parent = 6;
	tasks[7].parent = 6;
	tasks[8].parent = 6;
	tasks[9].parent = 9;
	tasks[10].parent = 9;
	tasks[11].parent = 9;

	tasks[3].type = "project";
	tasks[15].type = "milestone";

	const links = [
		{ id: 1, source: 3, target: 4, type: 0 },
		{ id: 2, source: 1, target: 2, type: 0 },
		{ id: 21, source: 8, target: 1, type: 1 },
		{ id: 22, source: 1, target: 6, type: 0 },
		{ id: 3, source: 5, target: 6, type: 3 },
		{ id: 4, source: 8, target: 6, type: 1 },
	];

	const scales = [{ unit: "day", step: 1, format: "d", css: dayStyle }];

	const columns = [
		{ name: "text", label: "Task name", width: "100%" },
		{ name: "start", label: "Start time", align: "center" },
		{ name: "duration", label: "Duration", width: "70px", align: "center" },
		{ name: "add-task", label: "", width: "50px", align: "center" },
	];

	return { tasks, links, scales, columns };
}
