import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from 'src/dtos/createProjectDto.class';
import { IProject } from 'src/models/project.class';
import { Repository } from './repository.class';


@Injectable()
export class ProjectsService {

    private repo: Repository;

    constructor() {
        this.repo = new Repository("Project", [])
    }

    async createProject(dto:CreateProjectDto): Promise<IProject> {

        const proj = await this.getProject(dto.name);
        if (proj) throw "Project already exists";
        
        await this.repo.save({
            name: dto.name,
            description: dto.description,
            owner: dto.owner
        })

        return this.getProject(dto.name);
    }

    async getProject(name: string): Promise<IProject> {
        return this.repo.getBy('name', name);
    }

    async listProjects():Promise<IProject[]> {
        return this.repo.listAll();
    }

}
