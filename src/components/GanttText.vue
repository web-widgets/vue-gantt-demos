<template>
	<Gantt
		:borders="borders"
		:cellHeight="cellHeight"
		:templates="{ sidebarForm, taskText }"
		:tasks="tasks"
		:links="data.links"
		:scales="data.scales"
		:columns="columns"
	/>
</template>

<script>
	/* eslint-disable vue/no-unused-components */
	import { getData } from "../common/data";
	import Gantt from "@dhtmlx/trial-vue-gantt";
	import MySidebarForm from "./MySidebarForm.vue";
	import MyTaskContent from "./MyTaskContent.vue";

	export default {
		components: {
			Gantt,
			MySidebarForm,
			MyTaskContent,
		},

		props: ["borders", "cellHeight"],

		data: () => ({
			data: getData(),
			sidebarForm: MySidebarForm,
			taskText: MyTaskContent,
		}),

		computed: {
			tasks() {
				return this.data.tasks.map(task => {
					task.textRight = task.text;
					task.text = "";
					return task;
				});
			},

			columns() {
				return this.data.columns.map((column, i) => {
					if (i === 0) column.name = "textRight";
					return column;
				});
			},
		},
	};
</script>
