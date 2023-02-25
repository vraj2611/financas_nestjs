import { User } from "./user.entity";
import { Project } from "./project.entity";

export enum Role {
    Admin = "ADMIN",
    Auditor = "AUDITOR",
    Owner = "OWNER",
    Planner = "PLANNER",
    Contractor = "CONTRACTOR"
}

export class Credential {
    id: string;
    user: User;
    role: Role;
    project: Project;
    created_at: number;
    revoked_at: number;

    isActive(){
        return this.revoked_at != null
    }

    constructor(partial: Partial<Credential>) {
        Object.assign(this, partial);

        if (this.role == Role.Admin || this.role == Role.Auditor){
        if (this.project != null) throw new Error("For Admin and Auditor Roles should not have project.")
        }
    }

}