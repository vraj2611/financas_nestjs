import { Controller, Get, Post, Body, Put, Delete, Param, Req } from '@nestjs/common';
import { UsersService } from 'src/services/users.service';
import { CreateUserDto } from 'src/dtos/createUserDto.class';
import { SecurityService } from 'src/security/security.service';
import { Public } from 'src/security/jwt.guard';
import { UpdateUserDto } from 'src/dtos/updateUserDto';
import { Roles } from 'src/security/permission.guard';
import { Role } from 'src/models/role.enum';

@Controller('users')
export class UsersController {
    constructor(
        private readonly serv: UsersService,
        private readonly secServ: SecurityService
    ) { }

    @Public()
    @Post()
    async createUser(@Body() dto: CreateUserDto) {
        dto = await this.secServ.encrypt_object(dto, ['creditcard']);
        dto.password = await this.secServ.hashPassword(dto.password);
        return await this.serv.createUser(dto);
    }

    @Get()
    async listUsers() {
        return await this.serv.listUsers();
    }

    @Get('me')
    async myprofile(@Req() req) {
        const user = await this.serv.get(req.user.id);
        return this.secServ.decrypt_object(user, ['creditcard']);
    }

    @Roles(Role.Owner)
    @Get(":id")
    async getUser(@Param('id') id: string) {
        return this.serv.get(id);
    }

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
