import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import helmet from 'helmet';

import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
export async function setEnvVariables() {
    const variables: string[] = ['LOGGING_PROVIDER_PORT', 'LOGGING_PROVIDER_HOST', 'JWT_SECRET'];
    const client = new SecretManagerServiceClient();
    for (const v of variables) {
        const secretpath = `projects/${process.env.GOOGLE_CLOUD_PROJECT}/secrets/${v}/versions/1`;
        const [version] = await client.accessSecretVersion({ name: secretpath });
        process.env[v] = version.payload.data.toString();
    }
}

async function bootstrap() {
    await setEnvVariables();
    const app = await NestFactory.create(AppModule);
    app.use(helmet())
    app.enableCors();
    await app.listen(process.env.PORT || 8976);
    process.env.NESTJS_URL = await app.getUrl();
    console.log(`App on: ${process.env.NESTJS_URL}`);
}
bootstrap()

