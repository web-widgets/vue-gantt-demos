<template>
	<div class="rows">
		<div class="row">
			<Button @click="addGantt">Add Gantt</Button>
		</div>

		<div v-for="gantt in gantts" :key="gantt.id" class="ganttCell">
			<div class="ganttHeader">
				<Button appearance="danger" @buttonClick="() => removeGantt(gantt.id)">
					Delete Gantt
				</Button>
			</div>
			<Gantt
				:borders="borders"
				:cellHeight="cellHeight"
				:tasks="gantt.data.tasks"
				:links="gantt.data.links"
				:scales="gantt.data.scales"
				:columns="gantt.data.columns"
			/>
		</div>
	</div>
</template>

<script>
	import { Gantt, wx } from "@dhtmlx/trial-vue-gantt";
	import { getData } from "../common/data";

	const { Button } = wx;

	export default {
		components: {
			Gantt,
			Button,
		},

		props: ["borders", "cellHeight"],

		data: () => ({
			data: getData(),
			counter: 1,
			gantts: [{ id: new Date().valueOf(), data: getData("[" + 1 + "] ") }],
		}),

		methods: {
			addGantt() {
				this.gantts = [
					...this.gantts,
					{
						id: new Date().valueOf(),
						data: getData("[" + this.counter++ + "] "),
					},
				];
			},

			removeGantt(id) {
				this.gantts = this.gantts.filter(a => a.id !== id);
			},
		},
	};
</script>

<style scoped>
	.rows {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.row {
		padding: 13px;
	}

	.ganttCell {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-bottom: 10px;
		overflow: hidden;
	}

	.ganttHeader {
		padding: 13px;
		background-color: #fff;
		border-bottom: 1px solid var(--wx-border-color);
	}
</style>
