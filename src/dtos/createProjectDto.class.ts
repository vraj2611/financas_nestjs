export class CreateProjectDto {
    name: string;
    description: string;
    owner?: string;
    created_at?: number;
}