import { createApp } from "vue";
import { router } from "./routes";

import Demos from "./components/Demos.vue";

createApp(Demos).use(router).mount(".app");
