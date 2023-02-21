import { Controller, Get, Post, Body, HttpException, HttpStatus, Put, Delete, Patch, Param, Req } from '@nestjs/common';
import { UsersService } from 'src/services/users.service';
import { CreateUserDto } from 'src/dtos/createUserDto.class';
import { SecurityService } from 'src/security/security.service';
import { Public } from 'src/security/jwt.guard';
import { UpdateUserDto } from 'src/dtos/updateUserDto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly serv: UsersService,
        private readonly secServ: SecurityService
    ) { }

    @Public()
    @Post()
    async createUser(@Body() dto: CreateUserDto) {
        try {
            dto.password = await this.secServ.hashPassword(dto.password);
            return await this.serv.createUser(dto);
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    @Public()
    @Get()
    async listUsers() {
        return await this.serv.listUsers();
    }

    @Public()
    @Get(":id")
    async getUser(@Param('id') id: string) {
        return this.serv.get(id);
    }

    @Get('me')
    async myprofile() {
        return await this.serv.listUsers();
    }

    @Public()
    @Put(":id")
    async updateUser(
        @Param('id') id: string,
        @Body() dto: UpdateUserDto
    ) {
        dto.id = id;
        return await this.serv.updateUser(dto);
    }

    @Public()
    @Delete(":id")
    async deleteUser(@Param('id') id: string) {
        return await this.serv.deleteUser(id);
    }

}
