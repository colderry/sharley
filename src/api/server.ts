import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
dotenv.config();

import Controller from "./controllers";

import applyMiddlewares from "./functions/apply-middlewares";
import setupRoutes from "./functions/setup-routes";
import setupStrategies from "./functions/setup-strategies";
import renderPage from "./functions/render-page";

class Server {
	public app = express();
	public port = process.env.PORT || 3000;

	public constructor () {
		// Set view engine and stuffs
		this.app.set("view engine", "ejs");
		this.app.set("views", path.join("views"));
		this.app.use(express.static(path.join("public")));

		// Middlewares & Strategies
		applyMiddlewares(this.app);
		setupStrategies();

		// Controllers & Routes & Pages
		this.controllers().then(() => this.routes());
		this.pages(this.app);
	}

	public async controllers (): Promise<Controller> {
		return Controller.setAll();
	}

	public routes (app = this.app): void {
		setupRoutes(app, {
			ver: "v1",
			route: { includeVer: false }
		});

		setupRoutes(app, {
			ver: "v1"
		});
	}

	public pages (app = this.app): void {
		renderPage(app, {
			path: "/",
			file: "index"
		});
	}

	public listen (port = this.port) {
		initDB(); // Database should be connected before server gets ready. As for development it is here.

		this.app.listen(port, () => {
			console.log(`Worker: ${process.pid} | Server is ready`);
		});

		return this;
	}
}

function initDB (): void {
	mongoose.connection.on("open", () => {
		console.log(`Worker: ${process.pid} | MongoDB was connected`);
	});

	mongoose.connect(process.env.MongoDB);
}

export function start () {
	return new Server().listen();
}