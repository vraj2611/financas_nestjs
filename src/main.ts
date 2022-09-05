import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { setEnvVariables } from './gcp-setenv';
import helmet from 'helmet';

async function bootstrap() {
    await setEnvVariables()
    const app = await NestFactory.create(AppModule);
    app.use(helmet())
    app.enableCors();
    await app.listen(process.env.PORT || 8976);
    console.log(`App on: ${await app.getUrl()}`);
}
bootstrap();
