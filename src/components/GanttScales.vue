<template>
	<Gantt
		:borders="borders"
		:cellHeight="cellHeight"
		:tasks="data.tasks"
		:links="data.links"
		:scales="complexScales"
		:columns="data.columns"
	/>
</template>

<script>
	import Gantt from "@dhtmlx/trial-vue-gantt";
	import { getData, complexScales } from "../common/data";

	export default {
		components: {
			Gantt,
		},

		props: ["borders", "cellHeight"],

		data: () => ({
			data: getData(),
			complexScales,
		}),
	};
</script>
