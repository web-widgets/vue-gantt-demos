<!-- eslint-disable vue/no-mutating-props  -->
<template>
	<div class="rows">
		<div class="slider">
			<Slider
				label="Cell width"
				:value="cellWidth"
				:min="20"
				:max="200"
				@change="v => (cellWidth = v)"
			/>

			<Slider
				label="Cell height"
				:value="cellHeight"
				:min="20"
				:max="60"
				@change="v => (cellHeight = v)"
			/>

			<Slider
				label="Scale height"
				:value="scaleHeight"
				:min="20"
				:max="60"
				@change="v => (scaleHeight = v)"
			/>
		</div>

		<div class="gantt">
			<Gantt
				:borders="borders"
				:tasks="data.tasks"
				:links="data.links"
				:scales="complexScales"
				:columns="data.columns"
				:cellWidth="cellWidth"
				:cellHeight="cellHeight"
				:scaleHeight="scaleHeight"
				:start="new Date(2020, 2, 1)"
				:end="new Date(2020, 3, 1)"
			/>
		</div>
	</div>
</template>
<script>
	import { getData, complexScales } from "../common/data";
	import { Gantt, wx } from "@dhtmlx/trial-vue-gantt";
	const { Slider } = wx;

	export default {
		components: {
			Gantt,
			Slider,
		},

		props: ["borders", "cellHeight"],

		data: () => ({
			data: getData(),
			complexScales,
			cellWidth: 100,
			scaleHeight: 30,
		}),
	};
</script>

<style scoped>
	.rows {
		position: relative;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.slider {
		padding: 10px;
	}

	.gantt {
		position: relative;
		height: 100%;
		border-top: 1px solid var(--wx-border-color);
	}
</style>
