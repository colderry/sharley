declare global {
	namespace NodeJS
	{
		interface ProcessEnv {
			MongoDB: string;
			PORT: number;

			// GitHub Secrets
			GitHub_Client_ID: string;
			GitHub_Client_Secret: string;
			GitHub_Callback_URL: string;
		}
	}
}

export {}