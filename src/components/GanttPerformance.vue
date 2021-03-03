<template>
	<div class="rows">
		<div class="row">
			<template v-if="start">
				10 000 tasks ( {{ years }} years ) rendered in <span ref="outArea" /> ms
			</template>
			<template v-else>
				<Button @click="() => (start = new Date())">Start</Button>
			</template>
		</div>
		<div v-if="start" class="gtcell">
			<Gantt
				:borders="borders"
				:cellHeight="cellHeight"
				:tasks="data.tasks"
				:links="data.links"
				:scales="complexScales"
				:columns="data.columns"
			/>
		</div>
	</div>
</template>

<script>
	import { getData, complexScales } from "../common/data";
	import Gantt from "@dhtmlx/trial-vue-gantt";
	import { wx } from "@dhtmlx/trial-vue-gantt";
	const { Button } = wx;

	export default {
		components: {
			Gantt,
			Button,
		},

		props: ["borders", "cellHeight"],

		data() {
			const count = 10000;
			const years = 3;
			return {
				data: getData("", count, years),
				years,
				complexScales,
				start: null,
				outArea: null,
			};
		},

		updated() {
			if (this.start && this.$refs.outArea)
				this.$refs.outArea.innerHTML = new Date() - this.start;
		},
	};
</script>

<style scoped>
	.rows {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.row {
		padding: 13px;
		font: var(--wx-font);
	}

	.gtcell {
		position: relative;
		height: 100%;
		min-height: 0;
		border-top: var(--wx-light-border);
		margin-bottom: 10px;
	}

	.gtcell:last-of-type {
		margin-bottom: 0;
	}
</style>
