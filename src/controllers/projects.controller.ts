import { Controller, Get, Post, Body, HttpException, HttpStatus, Req, Patch, Delete, UseGuards } from '@nestjs/common';
import { ProjectsService } from 'src/services/projects.service';
import { CreateProjectDto } from 'src/dtos/createProjectDto.class';
import { NoRestriction, RequirePermission, Permission } from 'src/security/permission.decorator';

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

    @NoRestriction()
    @Post()
    async createProject(@Req() req: Request, @Body() dto: CreateProjectDto) {
        try {
            dto.owner = req['user'].email;
            return await this.serv.createProject(dto);
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    @RequirePermission(Permission.UPDATE_PROJECT)
    @Patch(":id")
    async updateProject() {

    }

    @RequirePermission(Permission.UPDATE_PROJECT)
    @Post(":id/planner")
    async includePlanner() {

    }

    @RequirePermission(Permission.UPDATE_PROJECT)
    @Delete(":id/planner")
    async deletePlanner() {

    }

    @RequirePermission(Permission.UPDATE_PROJECT)
    @Post(":id/executer")
    async includeExecuter() {

    }

    @RequirePermission(Permission.UPDATE_PROJECT)
    @Delete(":id/executer")
    async deleteExecuter() {

    }

}
