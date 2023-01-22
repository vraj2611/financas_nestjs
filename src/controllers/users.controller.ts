import { Controller, Get, Post } from '@nestjs/common';

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
