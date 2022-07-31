import express, { Application } from "express";
import cookieSession from "cookie-session";
import passport from "passport";

export default function applyMiddleware (app: Application) {
	app.use(express.json());
	app.use(cookieSession({
		secret: "hfshsfh",
		keys: ["token"]
	}));

	// Initialize passport
	app.use(passport.initialize());
	app.use(passport.session());
}