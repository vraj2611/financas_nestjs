import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from 'src/dtos/createProjectDto.class';
import { IProject } from 'src/models/project.class';
import { ProjectRepository } from 'src/repositories/projects.repository';
import { RoleRepository } from 'src/repositories/roles.repository';
import { Role } from 'src/models/credential.class';
import { CreateRoleDto } from 'src/dtos/createRoleDto.class';


@Injectable()
export class ProjectsService {

    constructor(
        private repo: ProjectRepository,
        private rolerepo: RoleRepository) { }

    async createProject(dto: CreateProjectDto): Promise<IProject> {

        const proj = await this.getProject(dto.name);
        if (proj) throw "Project already exists";

        dto.created_at = Date.now()
        await this.repo.create(dto)

        await this.setRole({
            user_id: dto.owner,
            role: Role.Owner,
            project_id: dto.name,
        })

        return this.getProject(dto.name);
    }

    async getProject(name: string): Promise<IProject> {
        return this.repo.getBy('name', name);
    }

    async listProjects(): Promise<IProject[]> {
        return this.repo.listAll();
    }

    async setRole(dto: CreateRoleDto) {
        dto.granted_at = Date.now();
        return this.rolerepo.create(dto);
    }

}
