import { Controller, Get } from '@nestjs/common';

@Controller('projects')
export class ProjectsController {
    constructor() { }

    @Get()
    test(){
        return "project ok"
    }

}
