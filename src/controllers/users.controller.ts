import { Controller, Get, Post, Body, Put, Delete, Param, Req } from '@nestjs/common';
import { UsersService } from 'src/services/users.service';
import { CreateUserDto } from 'src/dtos/createUserDto.class';
import { SecurityService } from 'src/security/security.service';
import { UpdateUserDto } from 'src/dtos/updateUserDto';
import { Public } from 'src/security/public.decorator';
import { DoNotRequireRole } from 'src/security/permission.decorator';

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

    @DoNotRequireRole()
    @Get("/myprofile")
    async myprofile(@Req() req) {
        console.log({req})
        const user = await this.serv.get(req.user.id);
        return this.secServ.decrypt_object(user, ['creditcard']);
    }

    @DoNotRequireRole()
    @Get()
    async listUsers() {
        return await this.serv.listUsers();
    }

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

    @Delete(":id")
    async deleteUser(@Param('id') id: string) {
        return await this.serv.deleteUser(id);
    }


}
