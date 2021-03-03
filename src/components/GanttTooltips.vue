<template>
	<Gantt
		:borders="borders"
		:cellHeight="cellHeight"
		:tooltip="tooltip"
		:tasks="data.tasks"
		:links="data.links"
		:scales="data.scales"
		:columns="data.columns"
	/>
</template>

<script>
	/* eslint-disable vue/no-unused-components */
	import Gantt from "@dhtmlx/trial-vue-gantt";
	import MyTooltipContent from "./MyTooltipContent.vue";
	import { getData } from "../common/data";

	export default {
		components: {
			Gantt,
			MyTooltipContent,
		},

		props: ["borders", "cellHeight"],

		data: () => ({
			data: getData(),
			tooltip: MyTooltipContent,
		}),
	};
</script>
