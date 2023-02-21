import { Controller, Get, Post, Body, HttpException, HttpStatus, Req, Patch, Delete } from '@nestjs/common';
import { CostsService } from 'src/services/costs.service';
import { CreateCostDto } from 'src/dtos/createCostDto.class';

@Controller('costs')
export class CostsController {
    constructor(
        private readonly serv: CostsService
    ) { }

    @Get()
    async list() {
        
    }

    @Get(":id")
    async getOne() {
    }

    @Post()
    async createProject(@Req() req: Request, @Body() dto: CreateCostDto) {
    }

    @Patch(":id")
    async updateProject(){

    }

    @Delete(":id")
    async deleteCost(){

    }

}
