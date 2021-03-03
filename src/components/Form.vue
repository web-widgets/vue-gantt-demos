<template>
	<div class="backdrop">
		<div
			ref="node"
			class="modal"
			:style="nodeStyle"
			@mousedown="down"
			@mousemove="move"
			@mouseup="up"
		>
			<div class="header">
				<h3 class="title" data-id="title">Edit task</h3>
				<div class="close" @click="hide">&#9587;</div>
			</div>

			<div class="body">
				<Text
					label="Task name"
					:value="task.text"
					@change="v => update('text', v)"
				/>

				<Textarea
					label="Task details"
					:value="task.details"
					@change="v => update('details', v)"
				/>

				<Slider
					:label="`Progress: ${task.progress}%`"
					:value="task.progress"
					@change="v => update('progress', v)"
				/>

				<Datepicker
					label="Start date"
					id="start_date"
					:value="task.start_date"
					:readonly="true"
					@change="v => update('start_date', v)"
				/>

				<Datepicker
					label="End date"
					id="end_date"
					:value="task.end_date"
					:readonly="true"
					@change="v => update('end_date', v)"
				/>

				<Counter
					label="Task duration"
					:value="task.duration"
					@change="v => update('duration', v)"
				/>

				<button class="button danger" @click="remove">Delete</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { differenceInCalendarDays, addDays } from "date-fns";
	import { wx } from "@dhtmlx/trial-vue-gantt";
	const { Text, Textarea, Slider, Datepicker, Counter } = wx;

	export default {
		components: {
			Text,
			Textarea,
			Slider,
			Datepicker,
			Counter,
		},

		props: ["task"],

		data: () => ({
			node: null,
			left: 0,
			top: 0,
			dx: 0,
			dy: 0,
			moving: false,
		}),

		mounted() {
			this.node = this.$refs.node;
			this.left = (window.innerWidth - this.$refs.node.offsetWidth) / 2;
			this.top = (window.innerHeight - this.$refs.node.offsetHeight) / 2;
		},

		methods: {
			down(e) {
				const id = e.target.dataset.id;
				if (id === "title") {
					this.dx = e.pageX - this.node.offsetLeft;
					this.dy = e.pageY - this.node.offsetTop;
					this.moving = true;
				}
			},

			move(e) {
				if (this.moving) {
					this.node.style.left = `${e.pageX - this.dx}px`;
					this.node.style.top = `${e.pageY - this.dy}px`;
				}
			},

			up() {
				this.top = this.node.offsetTop;
				this.left = this.node.offsetLeft;
				this.moving = false;
			},

			hide() {
				this.$emit("action", { action: "hide-details" });
			},

			remove() {
				this.$emit("action", { action: "delete-task", id: this.task.id });
				this.$emit("action", { action: "hide-details" });
			},

			action(data) {
				this.$emit("action", data);
			},

			update(name, value) {
				const { task } = this;
				task[name] = value;

				switch (name) {
					case "start_date":
					case "end_date":
						task.duration = differenceInCalendarDays(
							task.end_date,
							task.start_date
						);
						break;

					case "duration":
						task.duration = value * 1;
						task.end_date = addDays(task.start_date, task.duration);
						break;
				}

				this.$emit("action", { action: "update-task", id: task.id, obj: task });
			},
		},

		computed: {
			nodeStyle() {
				return {
					top: `${this.top}px`,
					left: `${this.left}px`,
				};
			},
		},
	};
</script>

<style scoped>
	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 5;
		background: rgba(0, 0, 0, 0.15);
	}

	.modal {
		position: relative;
		width: 340px;
		padding: 20px;
		border-radius: 6px;
		box-shadow: 0 4px 4px rgba(0, 0, 0, 0.12), 0 0 10px rgba(0, 0, 0, 0.06);
		background-color: #fff;
		font: var(--wx-font);
		color: var(--wx-font-color);
	}
	.header {
		cursor: move;
	}

	.title {
		margin: 0;
	}

	.close {
		position: absolute;
		top: 20px;
		right: 20px;
		width: 20px;
		height: 20px;
		cursor: pointer;
		font-weight: 700;
		transition: color 0.15s ease-in;
	}

	.close:hover {
		color: rgb(255, 122, 122);
	}

	.body {
		margin: 20px 0;
	}

	.button {
		padding: 10px;
		margin: 0 0 0.5em 0;
		box-sizing: border-box;
		border: 1px solid #ccc;
		border-radius: 2px;
		font: var(--wx-font);
		border-radius: 3px;
		cursor: pointer;
	}

	.button:focus {
		outline: none;
		opacity: 0.7;
	}

	.danger {
		color: var(--wx-button-danger-font-color);
		background-color: var(--wx-button-danger-color);
	}

	.danger:hover {
		background-color: var(--wx-button-danger-color-hover);
	}
</style>
