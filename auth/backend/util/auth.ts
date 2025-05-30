import { sign, verify } from "jsonwebtoken";
import { compare } from "bcrypt";
import { NotAuthError } from "./errors.ts";

const KEY = "supersecret";

function createJSONToken(email: string) {
	return sign({ email }, KEY, { expiresIn: "1h" });
}

function validateJSONToken(token: string) {
	return verify(token, KEY);
}

function isValidPassword(password: string, storedPassword: string) {
	return compare(password, storedPassword);
}

function checkAuthMiddleware(req, res, next) {
	if (req.method === "OPTIONS") {
		return next();
	}
	if (!req.headers.authorization) {
		console.log("NOT AUTH. AUTH HEADER MISSING.");
		return next(new NotAuthError("Not authenticated."));
	}
	const authFragments = req.headers.authorization.split(" ");

	if (authFragments.length !== 2) {
		console.log("NOT AUTH. AUTH HEADER INVALID.");
		return next(new NotAuthError("Not authenticated."));
	}
	const authToken = authFragments[1];
	try {
		const validatedToken = validateJSONToken(authToken);
		req.token = validatedToken;
	} catch (error) {
		console.log("NOT AUTH. TOKEN INVALID.");
		return next(new NotAuthError("Not authenticated."));
	}
	next();
}

export {
	createJSONToken,
	validateJSONToken,
	isValidPassword,
	checkAuthMiddleware,
};
