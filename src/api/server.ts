import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

import Controller from "./controllers";

import applyMiddlewares from "./functions/apply-middlewares";
import setupRoutes from "./functions/setup-routes";
import setupStrategies from "./functions/setup-strategies";

class Server {
	public app = express();
	public port = process.env.PORT || 3000;

	public constructor () {
		// Middlewares & Strategies
		applyMiddlewares(this.app);
		setupStrategies();

		// Controllers & Routes
		this.controllers().then(() => this.routes());
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