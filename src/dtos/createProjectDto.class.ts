import { ApiProperty } from "@nestjs/swagger";

export class CreateProjectDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;
    
    owner?: string;
    created_at?: number;
}