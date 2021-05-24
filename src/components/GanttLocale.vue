<template>
	<div class="rows">
		<div class="row">
			<Button @click="setIndex">Change Locale</Button>
		</div>
		<div class="gtcell">
			<template v-if="langs[index] === 'en'">
				<Gantt
					:borders="borders"
					:cellHeight="cellHeight"
					:tasks="data.tasks"
					:links="data.links"
					:scales="data.scales"
					:columns="data.columns"
				/>
			</template>
			<template v-if="langs[index] === 'ru'">
				<RULocale :words="locales.ru">
					<Gantt
						:borders="borders"
						:cellHeight="cellHeight"
						:tasks="data.tasks"
						:links="data.links"
						:scales="data.scales"
						:columns="data.columns"
					/>
				</RULocale>
			</template>
			<template v-if="langs[index] === 'cn'">
				<CNLocale :words="locales.cn">
					<Gantt
						:borders="borders"
						:cellHeight="cellHeight"
						:tasks="data.tasks"
						:links="data.links"
						:scales="data.scales"
						:columns="data.columns"
					/>
				</CNLocale>
			</template>
		</div>
	</div>
</template>

<script>
	import Gantt from "@dhtmlx/trial-vue-gantt";
	import { wx, locales } from "@dhtmlx/trial-vue-gantt";
	import { getData } from "../common/data";

	const { Button, RULocale, CNLocale } = wx;

	export default {
		components: {
			Gantt,
			Button,
			RULocale,
			CNLocale,
		},

		props: ["borders", "cellHeight"],

		data: () => ({
			data: getData(),
			langs: ["en", "ru", "cn"],
			index: 0,
			locales,
		}),

		methods: {
			setIndex() {
				this.index = this.index >= this.langs.length - 1 ? 0 : this.index + 1;
			},
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
