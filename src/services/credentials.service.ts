import { RoleRepository } from "src/repositories/roles.repository";
import { CreateRoleDto } from "src/dtos/createRoleDto.class";
import { Injectable } from "@nestjs/common";
import { Role } from "src/entities/credential.entity";

@Injectable()
export class CredentialService {

    constructor(
        private repo: RoleRepository
    ) { }

    async listByUser(user_id:string){
        return this.repo.listBy('user_id', user_id);
    }

    async listByProject(proj_id: string){
        return this.repo.listBy('project_id', proj_id);
    }

    async addAdmin(user_id:string){
        this.setRole({
            user_id: user_id,
            role: Role.Admin,
            project_id: null
        })
    }

    async removeAdmin(user_id:string){
        const roles = await this.listByUser(user_id);
        this.revokeRole(roles[0]['id'])
    }

    async setRole(dto: CreateRoleDto) {
        dto.granted_at = Date.now();
        dto.revoked_at = null;
        return this.repo.create(dto);
    }

    async revokeRole(id:string) {
        const role = await this.repo.get(id);
        role.revoked_at = Date.now();
        return this.repo.update(role);
    }

}