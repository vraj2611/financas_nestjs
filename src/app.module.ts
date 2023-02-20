import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { UsersController } from './controllers/users.controller';
import { ProjectsController } from './controllers/projects.controller';
import { ServicesModule } from './services/services.module';
import { SecurityModule } from './security/security.module';
import { RepositoriesModule } from './repositories/repositories.module';
import { AppController } from './controllers/app.controller';
import { APP_GUARD } from '@nestjs/core';


@Module({
    imports: [
        ServicesModule,
        RepositoriesModule,
        SecurityModule,
        ThrottlerModule.forRoot({
            ttl: 10,
            limit: 10,
        })
    ],
    controllers: [
        AppController,
        UsersController,
        ProjectsController
    ],
    providers: [{
        provide: APP_GUARD,
        useClass: ThrottlerGuard
    }
    ],
})
export class AppModule { }
