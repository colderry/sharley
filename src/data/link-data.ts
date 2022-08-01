import LinkModel, { LinkDocument } from "../models/link-model";

export class Link {
	public static async create (to: string, options: {
		owner: string;
	}) {
		const link = new LinkModel({
			_id: Date.now(),
			code: Link.createCode(),
			redirect: { to },
			owner: options.owner
		});

		await link.save();
		return Link.modify(link);
	}

	public static async getAll (owner: string) {
		const allLinks = await LinkModel.find({ owner });
		const links: LinkData[] = [];

		allLinks.forEach((data) => links.push(Link.modify(data)));
		return links;
	}

	public static createCode () {
		const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		let code = "";

		for (let i = 0; i < 6; i++) {
			code += chars[Math.floor(Math.random() * chars.length)];
		}

		return code;
	}

	private static modify (data: LinkDocument) {
		return {
			id: data._id,
			code: data.code,
			redirect: {
				to: data.redirect.to
			},
			owner: data.owner,
			createdAt: data.createdAt
		};
	}
}

interface LinkData {
	id: string;
	code: string;
	redirect: {
		to: string;
	}
	owner: string;
	createdAt: string;
}