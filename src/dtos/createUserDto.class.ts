import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, IsCreditCard, IsPhoneNumber, Length } from "class-validator";

export class CreateUserDto {
    
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsEmail()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @Length(16)
    @ApiProperty()
    creditcard: string;
    
    @Length(9)
    @ApiProperty()
    phone: string;

    created_at?: number;
}