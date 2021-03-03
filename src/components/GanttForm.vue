<template>
	<div class="wrapper">
		<Gantt
			:borders="borders"
			:cellHeight="cellHeight"
			:readonly="{ noEdit: true }"
			:tasks="data.tasks"
			:links="data.links"
			:scales="data.scales"
			:columns="data.columns"
			:start="new Date(2020, 2, 1)"
			:end="new Date(2020, 3, 1)"
			@action="ganttAction"
			@store="store = $event"
		/>

		<Form v-if="task" :task="task" @action="formAction" />
	</div>
</template>

<script>
	import Gantt from "@dhtmlx/trial-vue-gantt";
	import Form from "./Form.vue";
	import { getData } from "../common/data";

	export default {
		components: {
			Gantt,
			Form,
		},

		props: ["borders", "cellHeight"],

		data: () => ({
			data: getData(),
			task: null,
			store: null,
		}),

		methods: {
			ganttAction(e) {
				const { id, nId, action } = e;

				switch (action) {
					case "show-details":
						this.task = this.store.getTask(id);
						break;

					case "add-task":
						this.task = this.store.getTask(nId);
						break;

					default:
						break;
				}
			},

			formAction(e) {
				switch (e.action) {
					case "hide-details":
						this.task = null;
						break;

					default:
						break;
				}

				this.store.action(e.id, e.action, e.obj);
			},
		},
	};
</script>

<style scoped>
	.wrapper {
		position: absolute;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
</style>
