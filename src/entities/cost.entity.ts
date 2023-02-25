import { Category, ICategory } from "./category.entity";
import { User, IUser } from "./user.entity";

export enum TypeCost {
    PLANNING = 0,
    EXECUTUION = 1
}

export interface ICost {
    value: number;
    category: ICategory;
    description: string;
    date: Date;
    type: TypeCost;
    createdBy: IUser | User;

}

export class Cost {
    id: string;
    value: number;
    category: Category;
    description: string;
    date: Date;
    type: TypeCost;
    created_by: User;
    aproved_by: User;

    constructor(partial: Partial<Cost>) {
        Object.assign(this, partial);
    }

    isAproved(){
        return this.aproved_by != null;
    } 
}