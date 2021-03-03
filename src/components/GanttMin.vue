<template>
	<Gantt
		:borders="borders"
		:cellHeight="cellHeight"
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
		}),
	};
</script>
