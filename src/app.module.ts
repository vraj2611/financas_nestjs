import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersController } from './controllers/users.controller';
import { ProjectsController } from './controllers/projects.controller';
import { ServicesModule } from './services/services.module';
import { SecurityModule } from './security/security.module';
import { RepositoriesModule } from './repositories/repositories.module';

@Module({
    imports: [
        ServicesModule,
        RepositoriesModule,
        SecurityModule
    ],
    controllers: [
        AppController,
        UsersController,
        ProjectsController
    ],
    providers: [],
})
export class AppModule { }
