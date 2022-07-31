import cluster from "node:cluster";
import { cpus } from "node:os";
import { start as startServer } from "./modules/server";

const numCPUs = cpus().length;

if (cluster.isMaster) {
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on("exit", (worker, code, singal) => {
		console.log("Worker: ${worker.process.pid} | Died");
		cluster.fork();
	})
} else {
	console.log(`Worker: ${process.pid} | Launched`);
	startServer();
}