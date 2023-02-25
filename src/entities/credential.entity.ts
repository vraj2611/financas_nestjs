import { User } from "./user.entity";
import { Project } from "./project.entity";

export enum Role {
    Admin = "ADMIN",
    Audit = "AUDIT",
    Owner = "OWNER",
    Planner = "PLANNER",
    Executer = "EXECUTER"
}

export class Credential {
    user: User;
    role: Role;
    project: Project;
}