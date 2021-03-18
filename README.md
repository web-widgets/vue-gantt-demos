# Vue Gantt Demos

[![NPM package](https://img.shields.io/npm/v/@dhtmlx/trial-vue-gantt)](https://www.npmjs.com/package/@dhtmlx/trial-vue-gantt)

- Online demo: https://dhtmlx.com/vue/demos/gantt/#/base/default
- Code of demos: https://github.com/web-widgets/vue-gantt-demos
- Minimal project: https://stackblitz.com/edit/vue-gantt-basic

## Getting Started 

```npm run serve``` Runs the app in the development mode.

Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

## Supported functionality

#### Common with DHTMLX Gantt

- adding/editing/deleting tasks and links
- tasks, projects and milestones
- configurable scales and grids
- configurable tooltips
- time markers

#### Unique features

- vue widgets can be used for tasks rendering, tooltips and form controls
- all configuration properties are reactive
- full vue sources are provided

## Usage

### Installation

- add library to your vue project

```js
npm install @dhtmlx/trial-vue-gantt
```

This will install trial version, for commercial one, use "@dhx/vue-gantt"

- place Gantt tag into the desired page

```jsx
import { Gantt, DefaultTheme } from "@dhtmlx/trial-vue-gantt";

export default function GanttBasic() {
  return (
    <DefaultTheme>
      <Gantt />
    </DefaultTheme>
  );
}
```

You can check the demo of mininal project here - https://stackblitz.com/edit/vue-gantt-basic

Source code of the gantt can be checked in node_modules/@dhtmlx/trial-vue-gantt/src

### Themes

Package contains two predefined themes - Default and Material. 

You can apply theme by wrapping Gantt into DefaultTheme or MaterialTheme tags

```jsx
<div>
    <DefaultTheme>
        <Gantt />
    </DefaultTheme>
    <MaterialTheme>
        <Gantt />
    </MaterialTheme>
</div>
```

or you can just add theme tag on the page and add skin class to one of Gantt's parent tags

```jsx
<div>
    <DefaultTheme />
    <MaterialTheme />

    <div class="wx-default"><Gantt /></div>
    <div class="wx-material"><Gantt /></div>
</div>
```

### Initialization

You can define scales/columns/tasks/links during Gantt initialization

```vue
<Gantt :scales="scales" :columns="columns" :tasks="tasks" :links="links" />
```

where data may look like next

```js
const scales = [
  { unit: "month", step: 1, format: "MMMM yyy" },
  { unit: "day", step: 1, format: "d" }
];

const columns = [
  { name: "text", label: "Task name", width: "100%" },
  { name: "start", label: "Start time", align: "center" },
  { name: "duration", label: "Duration", width: "70px", align: "center" },
  { name: "add-task", label: "", width: "50px", align: "center" }
];

const tasks = [
  {
    id: 1,
    open: true,
    start_date: "2020-11-06",
    duration: 8,
    text: "vue Gantt Widget",
    progress: 60,
    type: "project"
  },
  {
    id: 2,
    parent: 1,
    start_date: "2020-11-06",
    duration: 4,
    text: "Lib-Gantt",
    progress: 80
  }
];

const links = [
  { source: 2, target: 1, type: 0 }
];
```

### Integration with backend

Check 
https://github.com/web-widgets/vue-gantt-demos/blob/master/src/components/GanttBackend.vue

Code defines the action handler through **save** event. This event will be triggered on any update and may be used to save changes to the persistent storage. 

In the above example, the RestDataProvider is used
https://github.com/web-widgets/gantt-data-provider/blob/master/src/providers/rest.ts You are not limited to this solution, though, and can extend the provided class or define a custom handler. 

We provide 2 demo backends, with nodejs and go

- https://github.com/web-widgets/gantt-go
- https://github.com/web-widgets/gantt-node

again, you are not limited to this solution. The above RestDataProvider can work with any REST like service and you can implement a fully custom solution ( sockets, graphql, etc. ) through custom save event. 

### Templates

The next elements can be customized through templates

- task text
- sidebar form

check https://github.com/web-widgets/vue-gantt-demos/blob/master/src/components/GanttText.vue

- tooltip content

check https://github.com/web-widgets/vue-gantt-demos/blob/master/src/components/GanttTooltips.vue


## API

### Properties

```js
    // templates for different elements of gantt
    let templates = {};
    // array of markers
    let markers = [];
    // supported task types
    let taskTypes = ["task", "project", "milestone"];
    // tasks data
    let tasks = [];
    // links data
    let links = [];
    // time scales configuration
    let scales = [
        { unit: "month", step: 1, format: "MMMM yyy" },
        { unit: "day", step: 1, format: "d" },
    ];
    // grid configuration
    let columns = [
        { name: "text", label: "Task name", width: "100%" },
        { name: "add-task", label: "", width: "50px", align: "center" },
    ];
    // time scale start
    let start = null;
    // time scale end
    let end = null;
    // width of scale cell
    let cellWidth = 100;
    // height of chart bar
    let cellHeight = 38;
    // height of scale cell
    let scaleHeight = 30;
    // readonly mode flag
    let readonly = false;
    // show or hide grid
    let grid = true;
    // show or hide tooltips
    let tooltip = null;
    // show or hide borders in the chart area
    let borders = "full";
```

### Events

```js
    // will be called with DataStore value on Gantt initalization
    let store = null;
    // will be called on any action in the Gantt
    let actions = null;
    // will be called on any data modification in the Gantt
    let save = null;
```

### Actions

**Data modifications** ( both *action* and *save* events )
- add-link
- update-link
- delete-link
- add-task
- update-task
- delete-task


**UI State** ( *action* event )

- data-request
- hide-details
- move-task
- scroll-chart
- select-task
- show-details
- task-toggle
- update-task-time

#### Example of event usage


```jsx
function handler({ action, obj, id }){
    if (action === "select-task")
        console.log(`Task ${id} was selected`);
}

<Gantt @action="handler"/>
```

### Methods

```jsx
let store;

<Gantt @store="v => store = v" />
```

and now you can use store's API to get or modify data.

```ts
interface IStore {
    getTask(id:number):GanttItemData;
    updateTask(id:number, obj:any, noSave:boolean):void;
    updateLink(id:number, obj: any, noSave:boolean):void;
    action(id:number, action:string, obj:StringHash<any>, noSave?: boolean):number;
}
```

action method can be used to trigger any of above actions


```js
store.action(taskId, "tasks-toggle");
store.action(linkId, "delete-link");
store.action(null, "add-link", { source: 1, target 2, type: 0 });
```
