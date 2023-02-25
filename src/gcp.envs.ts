import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

export async function setEnvVariables() {
    const variables: string[] = ['LOGGING_PROVIDER_PORT', 'LOGGING_PROVIDER_HOST', 'JWT_SECRET'];
    
    try {
        const client = new SecretManagerServiceClient();
        for (const v of variables) {
            const secretpath = `projects/${process.env.GOOGLE_CLOUD_PROJECT}/secrets/${v}/versions/1`;
            const [version] = await client.accessSecretVersion({ name: secretpath });
            process.env[v] = version.payload.data.toString();
        }
        console.log("Setting enviroment variables...");    
    } catch (error) {
        throw new Error("Something wrong happened acessing the Google Secret Manager.")
    }
    
}