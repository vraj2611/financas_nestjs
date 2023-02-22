import { UsersService } from "./users.service";
import { Module } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { CategoriesService } from "./categories.service";
import { CostsService } from "./costs.service";
import { RepositoriesModule } from "src/repositories/repositories.module";
import { SecurityModule } from "src/security/security.module";

@Module({
    imports: [RepositoriesModule],
    providers: [UsersService, ProjectsService, CategoriesService, CostsService],
    exports: [UsersService, ProjectsService, CategoriesService, CostsService],
})
export class ServicesModule { }
