import { Role } from "src/entities/credential.entity"

export class CreateRoleDto {
    user_id: string;
    role: Role;
    project_id: string;
    granted_at?:number;
    revoked_at?:number;
}