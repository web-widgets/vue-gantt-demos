<template>
	<Gantt
		:borders="borders"
		:cellHeight="cellHeight"
		:tasks="tasks"
		:links="links"
		:scales="scales"
		:columns="columns"
		@save="save"
		@store="store = $event"
	/>
</template>

<script>
	import Gantt from "@dhtmlx/trial-vue-gantt";
	import { getData } from "../common/data";
	import { RestDataProvider } from "@dhtmlx/gantt-data-provider";

	const url = "https://docs.dhtmlx.com/gantt-backend";

	export default {
		components: {
			Gantt,
		},

		props: ["borders", "cellHeight"],

		data() {
			this.server = new RestDataProvider(url, {
				task: (id, obj) => this.store.updateTask(id, obj, true),
				link: (id, obj) => this.store.updateLink(id, obj, true),
			});
			this.server.getData().then(data => {
				this.tasks = data.tasks;
				this.links = data.links;
			});

			const { columns, scales } = getData();

			return {
				columns,
				scales,
				tasks: [],
				links: [],
				store: null,
			};
		},

		methods: {
			save(data) {
				this.server.saveData(data);
			},
		},
	};
</script>
