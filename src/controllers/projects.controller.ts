import { Controller, Get, Post, Body, HttpException, HttpStatus, Req, Patch, Delete, UseGuards } from '@nestjs/common';
import { ProjectsService } from 'src/services/projects.service';
import { CreateProjectDto } from 'src/dtos/createProjectDto.class';
import { DoNotRequireRole, RequireRole } from 'src/security/permission.decorator';
import { Role } from 'src/entities/credential.entity';

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

    @DoNotRequireRole()
    @Post()
    async createProject(@Req() req: Request, @Body() dto: CreateProjectDto) {
        try {
            dto.owner = req['user'].email;
            return await this.serv.createProject(dto);
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    @RequireRole(Role.Owner)
    @Patch(":id")
    async updateProject() {

    }

    @RequireRole(Role.Owner)
    @Post(":id/planner")
    async includePlanner() {

    }

    @RequireRole(Role.Owner)
    @Delete(":id/planner")
    async deletePlanner() {

    }

    @RequireRole(Role.Owner)
    @Post(":id/executer")
    async includeExecuter() {

    }

    @RequireRole(Role.Owner)
    @Delete(":id/executer")
    async deleteExecuter() {

    }

}
