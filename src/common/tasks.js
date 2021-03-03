import { format } from "date-fns";

export async function makeTasksStore(server) {
	const store = await getTasksData(server);
	store.saveData = saveData;
	return store;
}

function getTasksData(server) {
	const tasks = fetch(server + "/tasks").then(a => a.json());
	const links = fetch(server + "/links").then(a => a.json());

	return Promise.all([tasks, links]).then(([tasks, links]) => {
		tasks.forEach(a => (a.serverId = a.id));
		links.forEach(a => (a.serverId = a.id));
		return { tasks, links };
	});
}

export function saveData(ev, server) {
	let tid;
	let queue = {};
	const { action, obj, get } = ev;

	switch (action) {
		case "update-task":
			// debounce updates
			tid = queue[obj.serverId];
			if (tid) clearTimeout(tid);
			queue[obj.serverId] = setTimeout(() => {
				return sendAsForm(
					server + "/tasks/" + obj.serverId,
					"PUT",
					serializeTask(obj)
				);
			}, 300);
			break;
		case "add-task":
			sendAsForm(server + "/tasks", "POST", serializeTask(obj), get);
			break;
		case "delete-task":
			sendAsForm(server + "/tasks/" + obj.serverId, "DELETE");
			break;
		case "update-link":
			sendAsForm(server + "/links/" + obj.serverId, "PUT", serializeLink(obj));
			break;
		case "add-link":
			sendAsForm(server + "/links", "POST", serializeLink(obj), get);
			break;
		case "delete-link":
			sendAsForm(server + "/links/" + obj.serverId, "DELETE");
			break;
		default:
			break;
	}
}

function serializeTask(task) {
	return {
		progress: task.progress,
		parent: task.parent,
		text: task.text,
		details: task.details,
		duration: task.duration,
		start_date: format(task.start_date, "yyyy-M-d") + " 00:00",
		end_date: format(task.end_date, "yyyy-M-d") + " 00:00",
	};
}

function serializeLink(link) {
	return {
		source: link.source,
		target: link.target,
		type: link.type,
	};
}

function sendAsForm(url, method, body, get) {
	const config = {
		method,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
	};

	if (body) {
		var line = [];
		for (var key in body) line.push(`${key}=${encodeURIComponent(body[key])}`);

		config.body = line.join("&");
	}

	return fetch(url, config)
		.then(a => a.json())
		.then(a => {
			if (get) get().serverId = a.id;
		});
}
