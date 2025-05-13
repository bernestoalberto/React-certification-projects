class NotFoundError {
	message: string;
	status: number;
	constructor(message: string) {
		this.message = message;
		this.status = 404;
	}
}

export { NotFoundError };
