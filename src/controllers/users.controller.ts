import { Controller, Get, Post, Body, Request, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from 'src/services/users.service';
import { CreateUserDto } from 'src/dtos/createUserDto.class';
import { LocalAuthGuard } from 'src/security/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/security/guards/jwt-auth.guard';
import { LoginDto } from 'src/dtos/loginDto.class';
import { SecurityService } from 'src/security/security.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userServ: UsersService,
        private readonly secServ: SecurityService) { }

    @Get()
    test() {
        return "usuario ok"
    }

    @Get('list')
    async listUsers() {
        return await this.userServ.listUsers();
    }

    @Post()
    async createUser(@Body() dto: CreateUserDto) {
        try {
            return await this.secServ.createUser(dto);
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('login')
    async login(@Body() dto: LoginDto) {
        try {
            return this.secServ.loginUser(dto.email, dto.password);
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

}
