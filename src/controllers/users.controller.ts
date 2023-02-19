import { Controller, Get, Post, Body, Request, HttpException, HttpStatus, UseGuards, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/services/users.service';
import { CreateUserDto } from 'src/dtos/createUserDto.class';
import { JwtAuthGuard } from 'src/security/jwt-auth.guard';
import { LoginDto } from 'src/dtos/loginDto.class';
import { SecurityService } from 'src/security/security.service';
import { IUser } from 'src/models/user.class';

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
            dto.password = await this.secServ.hashPassword(dto.password);
            return await this.userServ.createUser(dto);
        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('login')
    async login(@Body() dto: LoginDto) {
        try {
            const user:IUser = await this.userServ.getUser(dto.email);
            if (!await this.secServ.verifyPassword(user.password, dto.password)){
                throw new UnauthorizedException("email or password incorrect.")
            }
            return this.secServ.createJwt({email: user.email});
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('token')
    async checkToken(@Body() token:{token:string}){
        return this.secServ.extractJwt(token.token);
    }


    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

}
