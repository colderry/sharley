import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

// Functions
import setupRoutes from "../functions/setup-routes";

function initDB (): void {
	mongoose.connection.on("open", () => {
		console.log(`Worker: ${process.pid} | MongoDB was connected`);
	});

	mongoose.connect(process.env.MongoDB);
}

class Server {
	public app = express();
	public port = process.env.PORT || 3000;

	public constructor () {
		this.routes();
	}

	public routes (app = this.app) {
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

export function start () {
	return new Server().listen();
}