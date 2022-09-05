import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { SecurityModule } from './security/security.module';

@Module({
  imports: [SecurityModule, UsersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
