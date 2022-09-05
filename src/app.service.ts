import { Injectable } from '@nestjs/common';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }

    async getSecret(secretName:string): Promise<String> {
        const client = new SecretManagerServiceClient();
        const [version] = await client.accessSecretVersion({
            name: `projects/${process.env.GOOGLE_CLOUD_PROJECT}/secrets/${secretName}/versions/1`,
        });

        return version.payload.data.toString();
    }

}
