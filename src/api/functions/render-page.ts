import { Application } from "express";

export default function renderPage (app: Application, options: {
	path: string;
	file: string;
}) {
	app.get(options.path, (req, res) => {
		res.render(options.file);
	})
}