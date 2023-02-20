import { Role } from "src/models/role.enum"

export class CreateRoleDto {
    user: string;
    role: Role;
    project: string;
    created_at?:number;
}