import { Controller, Get, Post, Body, HttpException, HttpStatus, Req } from '@nestjs/common';
import { ProjectsService } from 'src/services/projects.service';
import { CreateProjectDto } from 'src/dtos/createProjectDto.class';

@Controller('projects')
export class ProjectsController {
    constructor(
        private readonly serv: ProjectsService
    ) { }

    @Get()
    async list() {
        return await this.serv.listProjects();
    }

    @Post()
    async createProject(@Req() req: Request, @Body() dto: CreateProjectDto) {
        try {
            dto.owner = req['user'].email;
            return await this.serv.createProject(dto);
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

}
