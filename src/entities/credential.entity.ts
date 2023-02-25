import { User } from "./user.entity";
import { Project } from "./project.entity";

export enum Role {
    Admin = "ADMIN",
    Auditor = "AUDITOR",
    Owner = "OWNER",
    Planner = "PLANNER",
    Contractor = "CONTARCTOR"
}

export class Credential {
    user: User;
    role: Role;
    project: Project;
}