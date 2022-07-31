import glob from "glob";
import path from "path";
import fs from "fs";

type CacheType = Record<string, Record<string, any>>;
const cache: CacheType = {};

class Controller {
	public static cache = cache;

	public static set (name: string, ver: string, controller: any) {
		if (!cache[ver]) cache[ver] = {};

		return cache[ver][name] = controller;
	}

	public static use (name: string, ver: string, method?: string) {
		if (!cache[ver] || !cache[ver][name]) {
			throw new Error(`Controller does not exist with the name ${name} in ${ver}`);
		}

		if (method) {
			if (!cache[ver][name][method]) {
				throw new Error(`Method: ${method} does not exist of ${name} in ${ver}`);
			}

			return cache[ver][name][method];
		} else {
			return cache[ver][name];
		}
	}

	public static async setup () {
		const dirs = getDirectories();

		dirs.forEach((dir) => {
			const contrs = glob.sync(`./dist/controllers/${dir}/**.js`, { nodir: true });

			contrs.forEach(async (filePath) => {
				let file = await import(path.resolve(filePath));

				if (!file || !file.default) {
					throw new Error("An controller file does not default export")
				} else file = file.default;

				const name = path.basename(filePath, ".js").split("-controller")[0];
				Controller.set(name, dir, file);
			});
		});
	}
}

function getDirectories (path = __dirname) {
	return fs.readdirSync(path).filter((file) => {
		return fs.statSync(path + `/${file}`).isDirectory();
	});
}


export default Controller;