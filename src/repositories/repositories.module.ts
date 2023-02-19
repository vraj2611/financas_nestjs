import { Module } from "@nestjs/common";
import { UserRepository } from "./users.repository";
import { ProjectRepository } from "./projects.repository";
import { CategoryRepository } from "./categories.repository";
import { CostRepository } from "./costs.repository";

@Module({
    providers: [UserRepository, ProjectRepository, CategoryRepository, CostRepository],
    exports: [UserRepository, ProjectRepository, CategoryRepository, CostRepository]
})
export class RepositoriesModule { }