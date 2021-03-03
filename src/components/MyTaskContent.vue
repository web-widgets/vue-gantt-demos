<template>
	<button class="btn" @click.stop="click">
		{{ clicked ? "Was clicked" : "Click me" }}
	</button>
</template>

<script>
	export default {
		data: () => ({
			clicked: false,
		}),

		methods: {
			click() {
				this.clicked = !this.clicked;
			},
		},
	};
</script>

<style>
	.btn {
		position: relative;
		font-size: 10px;
		z-index: 2;
	}
</style>
