<template>
	<default-theme />
	<material-theme />

	<div class="layout">
		<div :class="['sidebar', { move: show }]" @click="click">
			<template v-if="show">
				<div class="title">Gantt Demos</div>
			</template>

			<div :class="['skins', { move: !show }]" @click.stop="toggleSkin">
				<div
					v-for="data in skins"
					:key="data"
					:class="['skin', { selected: data.id === skin }]"
					:data-id="data.id"
					data-role="skin"
				>
					{{ data.name }}
				</div>
			</div>

			<template v-if="show">
				<template v-for="data in demos" :key="data">
					<router-link
						:to="data[0] + '/' + skin"
						class="demo"
						active-class="active"
						>{{ data[1] }}</router-link
					>
				</template>
			</template>

			<template v-else>
				<div class="hint">{{ title }}</div>
			</template>
		</div>

		<div :class="['content', skinName, { move: show }]" @click="hide">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import { markRaw } from "vue";
	import { demos, router, skins } from "../routes";
	import { wx } from "@dhtmlx/trial-vue-gantt";
	const { DefaultTheme, MaterialTheme } = wx;

	export default {
		components: {
			DefaultTheme,
			MaterialTheme,
		},

		data() {
			router.afterEach(to => {
				if (to.matched && to.matched.length) {
					this.title = to.matched[0].meta.title;
					const parts = to.fullPath.split("/");
					this.page = parts[1];
					this.skin = parts[2];
				}
			});

			return {
				skins,
				demos: markRaw(demos),
				show: false,
				title: "",
				skin: "",
				page: "",
			};
		},
		methods: {
			click() {
				this.show = true;
			},

			hide() {
				this.show = false;
			},

			toggleSkin(e) {
				const data = e.target.dataset;
				if (data.role === "skin") {
					router.push(`/${this.page}/${data.id}`);
				}
			},
		},

		computed: {
			skinName() {
				return "wx-" + this.skin;
			},
		},
	};
</script>

<style scoped>
	.layout {
		position: relative;
		height: 100%;
		font-family: "Roboto", Arial, Helvetica, sans-serif;
		font-size: 16px;
		background-color: #ebebeb;
	}

	.sidebar {
		box-sizing: border-box;
		position: absolute;
		height: 100%;
		width: 300px;
		background-color: #fbfbfb;
		transform: translateX(-220px);
		transition: 0.3s;
		z-index: 1;
	}

	.sidebar.move {
		transform: translateX(0);
	}

	.content {
		height: 100%;
		width: calc(100% - 85px);
		transition: 0.3s;
		transform: translateX(85px);
	}

	.content.move {
		transform: translateX(305px);
		width: calc(100% - 305px);
	}

	.hint {
		position: absolute;
		top: 30px;
		right: 30px;
		font-size: 16px;
		font-weight: 500;
		color: #5f5f5f;
		transform: rotate(180deg);
		writing-mode: vertical-rl;
	}

	.title {
		height: 58px;
		line-height: 58px;
		margin-bottom: 30px;
		text-align: center;
		font-size: 16px;
		font-weight: 500;
		color: #5f5f5f;
		background-color: rgba(235, 235, 235, 0.61);
	}

	.skins {
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 250px;
		height: 30px;
		margin: 0 auto;
		margin-bottom: 30px;
		border-radius: 15px;
		text-align: center;
		background-color: #e6e6e6;
	}

	.skins.move {
		position: absolute;
		top: 330px;
		right: -86px;
		transform: rotate(-90deg);
	}

	.skin {
		box-sizing: border-box;
		width: 123px;
		height: 26px;
		line-height: 26px;
		border-radius: 13px;
		font-weight: 400;
		text-transform: capitalize;
		color: #1876d2;
		cursor: pointer;
	}

	.skin.selected {
		font-weight: 500;
		color: #fff;
		background-color: #2095f3;
	}

	.demo {
		height: 36px;
		line-height: 36px;
		padding-left: 24px;
		border-left: 5px solid transparent;
		color: #5f5f5f;
		list-style: none;
		cursor: pointer;
		text-decoration: none;
		display: block;
	}

	.demo.active,
	.demo:hover {
		border-left-color: #2095f3;
		background-color: #ebebeb9c;
		font-weight: 500;
		cursor: pointer;
	}
</style>
