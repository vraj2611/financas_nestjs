import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    
    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    credicard: string;
    
    @ApiProperty()
    phone: string;

    created_at?: number;
}