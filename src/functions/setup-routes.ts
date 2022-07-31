import { Application } from "express";
import glob from "glob";
import path from "path";

export default function (app: Application, options: setupOptions) {
	const { ver, route = { includeVer: true } } = options;

	const routes = glob.sync(`./dist/routes/${ver}/**/*.js`);

	routes.forEach((p) => {
		import(path.resolve(p)).then((r) => {
			r = r.default;

			if (!r) {
				throw new Error("A route does not export default router");
			}

			app.use(`${route.path ?? "/"}${route.includeVer ? `${ver}` : ""}`, r);
		});
	});
}

interface setupOptions {
	ver: string;
	route?: {
		path?: string | null;
		includeVer?: boolean;
	}
}