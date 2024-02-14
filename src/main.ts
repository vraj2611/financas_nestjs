import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { setEnvVariables } from './gcp.envs';

export async function createSwagger(app){
    const config = new DocumentBuilder()
    .setTitle('Project Finance API')
    .setDescription('API developed to control cost that occurred in projects.')
    .setVersion('1.0')
    .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
}

async function bootstrap() {
    await setEnvVariables();
    const app = await NestFactory.create(AppModule);
    createSwagger(app);
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix('api');
    app.enableVersioning({
        defaultVersion: '1',
        type: VersioningType.URI
    });
    app.use(helmet());
    app.enableCors();
    await app.listen(8080, async () => {
        console.log(`App listen on: ${(await app.getUrl())}`);
    });
}

bootstrap()

