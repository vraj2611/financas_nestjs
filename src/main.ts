import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import helmet from 'helmet';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

export async function setEnvVariables() {
    const variables: string[] = ['LOGGING_PROVIDER_PORT', 'LOGGING_PROVIDER_HOST', 'JWT_SECRET'];
    const client = new SecretManagerServiceClient();
    for (const v of variables) {
        const secretpath = `projects/${process.env.GOOGLE_CLOUD_PROJECT}/secrets/${v}/versions/1`;
        const [version] = await client.accessSecretVersion({ name: secretpath });
        process.env[v] = version.payload.data.toString();
    }
    console.log("Setting enviroment variables...");
}

export async function createSwagger(app){
    const config = new DocumentBuilder()
    .setTitle('Project Finance API')
    .setDescription('API developed to control cost that occurred in projects.')
    .setVersion('1.0')
    .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
    await setEnvVariables();
    const app = await NestFactory.create(AppModule);
    createSwagger(app);
    app.useGlobalPipes(new ValidationPipe());
    app.use(helmet())
    app.enableCors();
    await app.listen(9876, async () => {
        console.log(`App listen on: ${(await app.getUrl())}`);
    });
}

bootstrap()

