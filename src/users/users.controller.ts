import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor() { }

    @Get()
    test(){
        return "usuario ok"
    }

    @Post()
    novoUsuario(){

    }

}
