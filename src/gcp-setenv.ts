import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import * as process from 'process';

export async function setEnvVariables() {
    await setSecret('LOGGING_PROVIDER_PORT');
    await setSecret('LOGGING_PROVIDER_HOST');
    await setSecret('JWT_SECRET');
}

async function setSecret(secretName: string) {
    const client = new SecretManagerServiceClient();
    const [version] = await client.accessSecretVersion({
        name: `projects/${process.env.GOOGLE_CLOUD_PROJECT}/secrets/${secretName}/versions/1`,
    });
    process.env[secretName] = version.payload.data.toString();
}
