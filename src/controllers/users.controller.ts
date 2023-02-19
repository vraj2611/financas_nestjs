import { Controller, Get, Post, Body, Request, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/services/users.service';
import { CreateUserDto } from 'src/dtos/createUserDto.class';
import { SecurityService } from 'src/security/security.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userServ: UsersService,
        private readonly secServ: SecurityService) { }

    @Get('list')
    async listUsers() {
        return await this.userServ.listUsers();
    }

    @Post()
    async createUser(@Body() dto: CreateUserDto) {
        try {
            dto.password = await this.secServ.hashPassword(dto.password);
            return await this.userServ.createUser(dto);
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

}
