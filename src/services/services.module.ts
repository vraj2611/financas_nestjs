import { UsersService } from "./users.service";
import { Module } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { CategoriesService } from "./categories.service";
import { CostsService } from "./costs.service";
import { RepositoriesModule } from "src/repositories/repositories.module";
import { RolesService } from "./roles.service";

@Module({
    imports: [RepositoriesModule],
    providers: [UsersService, ProjectsService, CategoriesService, CostsService, RolesService],
    exports: [UsersService, ProjectsService, CategoriesService, CostsService, RolesService],
})
export class ServicesModule { }
