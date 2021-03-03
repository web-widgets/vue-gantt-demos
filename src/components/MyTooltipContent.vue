<template>
	<div class="data">
		<div class="text">
			<span class="caption">{{ data.type }}:</span>
			{{ data.text }}
		</div>
		<div class="text">
			<span class="caption">start:</span>
			{{ start }}
		</div>
		<div class="text">
			<span class="caption">end:</span>
			{{ end }}
		</div>
	</div>
</template>

<script>
	import { format } from "date-fns";

	export default {
		props: ["data"],

		computed: {
			start() {
				return format(this.data.start_date, "yyyy.MM.dd");
			},

			end() {
				return format(this.data.end_date, "yyyy.MM.dd");
			},
		},
	};
</script>

<style scoped>
	.data {
		padding: 10px;
		border-radius: 2px;
		box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
		font: var(--wx-small-font);
		color: var(--wx-font-color);
		background-color: #fefdfd;
		white-space: nowrap;
	}

	.text {
		font: var(--wx-tooltip-font);
		color: var(--wx-tooltip-font-color);
		text-transform: capitalize;
		margin-bottom: 5px;
	}

	.text:last-child {
		margin-bottom: 0;
	}

	.caption {
		font-weight: 700;
	}
</style>
