<template>
	<Gantt
		:borders="borders"
		:cellHeight="cellHeight"
		:markers="markers"
		:tasks="data.tasks"
		:links="data.links"
		:scales="data.scales"
		:columns="data.columns"
	/>
</template>

<script>
	import Gantt from "@dhtmlx/trial-vue-gantt";
	import { getData } from "../common/data";

	export default {
		components: {
			Gantt,
		},

		props: ["borders", "cellHeight"],

		data: () => ({
			data: getData(),
			markers: [
				{
					start: new Date(2020, 2, 4),
					text: "Start",
					css: "",
					title: "start point of project",
				},
				{
					start: new Date(2020, 2, 8),
					text: "Middle point",
					css: "myMiddleClass",
					title: "",
				},
				{
					start: new Date(2020, 2, 11),
					text: "End point",
					css: "myEndClass",
					title: "end point of project",
				},
			],
		}),
	};
</script>

<style>
	.wx-default .myMiddleClass {
		background-color: rgba(232, 49, 37, 0.77);
	}

	.wx-material .myMiddleClass {
		background-color: rgba(255, 84, 84, 0.77);
	}

	.wx-default .myEndClass {
		background-color: rgba(29, 180, 164, 0.77);
	}

	.wx-material .myEndClass {
		background-color: rgba(54, 206, 124, 0.77);
	}
</style>
