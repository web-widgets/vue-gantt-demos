<template>
	<Text
		label="Name"
		:value="task.textRight"
		:autofocus="true"
		@change="v => update('text', v)"
	/>

	<Datepicker
		label="Start date"
		id="start_date"
		:value="task.start_date"
		:readonly="true"
		@change="v => update('start_date', v)"
	/>
</template>

<script>
	import { differenceInCalendarDays } from "date-fns";
	import { wx } from "@dhtmlx/trial-vue-gantt";
	const { Text, Datepicker } = wx;

	export default {
		components: {
			Text,
			Datepicker,
		},

		props: ["task"],

		methods: {
			hide() {
				this.$emit("action", { action: "hide-details" });
			},

			remove() {
				this.$emit("action", { action: "delete-task", id: this.task.id });
				this.$emit("action", { action: "hide-details" });
			},

			action(e) {
				this.$emit("action", e);
			},

			update(name, value) {
				const { task } = this;

				switch (name) {
					case "start_date":
						task[name] = value;
						task.duration = differenceInCalendarDays(
							task.end_date,
							task.start_date
						);
						break;

					case "text":
						task.textRight = value;
						break;

					default:
						task[name] = value;
						break;
				}

				this.$emit("action", { action: "update-task", id: task.id, obj: task });
			},
		},
	};
</script>
