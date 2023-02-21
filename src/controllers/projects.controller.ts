import { Controller, Get, Post, Body, HttpException, HttpStatus, Req, Patch, Delete } from '@nestjs/common';
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

    @Get(":id")
    async getProject() {
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

    @Patch(":id")
    async updateProject(){

    }

    @Post(":id/planner")
    async includePlanner(){

    }

    @Delete(":id/planner")
    async deletePlanner(){

    }


    @Post(":id/executer")
    async includeExecuter(){

    }

    @Delete(":id/executer")
    async deleteExecuter(){

    }

}
