import { Project } from "./project.entity";

export interface ICategory {
    id?: string;
    name: string;
    description: string;
}

export class Category {
    id?: string;
    name: string;
    description: string;
    project: Project;

    constructor(partial: Partial<Category>) {
        Object.assign(this, partial);
    }

}