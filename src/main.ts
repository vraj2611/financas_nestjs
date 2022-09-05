import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'process'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(env.PORT || 8976);
  console.log(`App on: ${await app.getUrl()}`);
}
console.log(env)
bootstrap();
