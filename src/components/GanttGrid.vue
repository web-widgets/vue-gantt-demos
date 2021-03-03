<template>
	<Gantt
		:borders="borders"
		:cellHeight="cellHeight"
		:tasks="data.tasks"
		:links="data.links"
		:scales="data.scales"
		:columns="simpleColumns"
		:start="new Date(2020, 2, 1)"
		:end="new Date(2020, 3, 1)"
	/>
</template>

<script>
	import Gantt from "@dhtmlx/trial-vue-gantt";
	import { getData, simpleColumns } from "../common/data";

	export default {
		components: {
			Gantt,
		},

		props: ["borders", "cellHeight"],

		data: () => ({
			data: getData(),
			simpleColumns,
		}),
	};
</script>
