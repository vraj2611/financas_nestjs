import { Module } from "@nestjs/common";
import { UserRepository } from "./users.repository";
import { ProjectRepository } from "./projects.repository";
import { CategoryRepository } from "./categories.repository";
import { CostRepository } from "./costs.repository";
import { RoleRepository } from "./roles.repository";

@Module({
    providers: [UserRepository, ProjectRepository, CategoryRepository, CostRepository, RoleRepository],
    exports: [UserRepository, ProjectRepository, CategoryRepository, CostRepository, RoleRepository]
})
export class RepositoriesModule { }