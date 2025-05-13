function isValidText(value: string): boolean {
	return typeof value === "string" && value.trim().length > 0;
}

function isValidDate(value: string): boolean {
	if (typeof value !== "string") return false;
	const date = new Date(value);
	return !isNaN(date.getTime());
}

function isValidImageUrl(value: string): boolean {
	return typeof value === "string" && value.startsWith("http");
}

export { isValidText, isValidDate, isValidImageUrl };
