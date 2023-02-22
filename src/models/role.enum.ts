export enum Role {
    Admin = "ADMIN",
    Audit = "AUDIT",
    Owner = "OWNER",
    Planner = "PLANNER",
    Executer = "EXECUTER"
}

export class FullRole {
    user_id: string;
    role: Role;
    project_id: string;
}