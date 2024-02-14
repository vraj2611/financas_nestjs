import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
    
    id?:string;
   
    @ApiProperty()
    name?: string;

    @ApiProperty()
    creditcard?: string;
    
    @ApiProperty()
    phone?: string;

}