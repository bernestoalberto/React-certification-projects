import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({});

type HTTP_METHOD_TYPE = "GET" | "POST" | "PUT" | "DELETE";

const GET: HTTP_METHOD_TYPE = "GET";
const POST: HTTP_METHOD_TYPE = "POST";
const PUT: HTTP_METHOD_TYPE = "PUT";
const DELETE: HTTP_METHOD_TYPE = "DELETE";

const URI = "http://localhost:3000";
const EVENTS = "/events";

export async function fetchEvents({
	signal,
	searchTerm,
	max,
}: {
	signal: AbortSignal;
	searchTerm?: string;
	max?: number;
}) {
	let url = `${URI}${EVENTS}`;
	if (searchTerm && max) {
		url += "?search=" + searchTerm + "&max=" + max;
	} else if (searchTerm) {
		url += "?search=" + searchTerm;
	} else if (max) {
		url += "?max=" + max;
	}
	const response = await fetch(url, { signal });

	if (!response.ok) {
		const error = new Error("An error occurred while fetching the events");
		error.code = response.status;
		error.info = await response.json();
		throw error;
	}

	const { events } = await response.json();

	return events;
}
export async function createNewEvent(eventData) {
	const response = await fetch(`${URI}${EVENTS}`, {
		method: POST,
		body: JSON.stringify(eventData),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		const error = new Error("An error occurred while creating the event");
		error.code = response.status;
		error.info = await response.json();
		throw error;
	}

	const { event } = await response.json();

	return event;
}
export async function fetchSelectableImages({ signal }) {
	const response = await fetch(`${URI}${EVENTS}/images`, {
		signal,
	});

	if (!response.ok) {
		const error = new Error("An error occurred while fetching the images");
		error.code = response.status;
		error.info = await response.json();
		throw error;
	}

	const { images } = await response.json();

	return images;
}
export async function fetchEvent({
	id,
	signal,
}: {
	id: string;
	signal: AbortSignal;
}) {
	const response = await fetch(`${URI}${EVENTS}/${id}`, {
		signal,
	});

	if (!response.ok) {
		const error = new Error("An error occurred while fetching the event");
		error.code = response.status;
		error.info = await response.json();
		throw error;
	}

	const { event } = await response.json();

	return event;
}
export async function deleteEvent(id: string) {
	const response = await fetch(`${URI}${EVENTS}/${id}`, {
		method: DELETE,
	});

	if (!response.ok) {
		const error = new Error("An error occurred while deleting the event");
		error.code = response.status;
		error.info = await response.json();
		throw error;
	}

	return response.json();
}
export async function updateEvent({ id, event }) {
	const response = await fetch(`${URI}${EVENTS}/${id}`, {
		method: PUT,
		body: JSON.stringify({ event }),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		const error = new Error("An error occurred while updating the event");
		error.code = response.status;
		error.info = await response.json();
		throw error;
	}

	return response.json();
}
