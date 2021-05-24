import { createWebHashHistory, createRouter } from "vue-router";

import GanttMin from "./components/GanttMin.vue";
import GanttBackend from "./components/GanttBackend.vue";
import GanttScales from "./components/GanttScales.vue";
import GanttGrid from "./components/GanttGrid.vue";
import GanttForm from "./components/GanttForm.vue";
import GanttNoGrid from "./components/GanttNoGrid.vue";
import GanttReadOnly from "./components/GanttReadOnly.vue";
import GanttSizes from "./components/GanttSizes.vue";
import GanttMultiple from "./components/GanttMultiple.vue";
import GanttPerformance from "./components/GanttPerformance.vue";
import GanttMarkers from "./components/GanttMarkers.vue";
import GanttTooltips from "./components/GanttTooltips.vue";
import GanttText from "./components/GanttText.vue";
import GanttLocale from "./components/GanttLocale.vue";

const skins = [
	{ id: "default", name: "Classic", borders: "full", cellHeight: 38 },
	{ id: "material", name: "Material", borders: "", cellHeight: 32 },
];

const demos = [
	["/base", "Gantt basic", GanttMin],
	["/backend", "Gantt with backend", GanttBackend],
	["/scales", "Custom scales", GanttScales],
	["/grid", "Custom grid", GanttGrid],
	["/form", "Custom edit form", GanttForm],
	["/chart", "Without the grid", GanttNoGrid],
	["/readonly", "Readonly mode", GanttReadOnly],
	["/sizes", "Scale / cell sizes", GanttSizes],
	["/many", "Many gantts per page", GanttMultiple],
	["/performance", "Performance", GanttPerformance],
	["/markers", "Markers", GanttMarkers],
	["/tooltips", "Tooltips", GanttTooltips],
	["/templates", "Custom text", GanttText],
	["/locale", "Locales", GanttLocale],
];

const routes = [{ path: "/", redirect: `${demos[0][0]}/${skins[0].id}` }];
demos.forEach(a => {
	routes.push({
		path: a[0] + "/:skin",
		component: a[2],
		meta: { title: a[1] },
		props: route => {
			const skin = skins.find(a => a.id === route.params.skin);
			if (!skin) return {};

			return { borders: skin.borders, cellHeight: skin.cellHeight };
		},
	});
});
const router = createRouter({ routes, history: createWebHashHistory() });

export { router, demos, skins };
