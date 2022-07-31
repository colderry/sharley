declare global {
	namespace NodeJS
	{
		interface ProcessEnv {
			MongoDB: string;
			PORT: number;
		}
	}
}

export {}