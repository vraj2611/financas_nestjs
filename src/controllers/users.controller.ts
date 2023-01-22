import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from 'src/services/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userServ: UsersService) { }

    @Get()
    test(){
        return "usuario ok"
    }

    @Get('list')
    listUsers(){
        return this.userServ.listUsers();
    }

    

}
