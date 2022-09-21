import { Category, ICategory } from "./category.class";
import { User, IUser } from "./user.class";

export enum TypeCost {
    PLANNED = 0,
    PAID = 1
}

export interface ICost {
    value: number;
    category: ICategory;
    description: string;
    date: Date;
    type: TypeCost;
    createdBy: IUser
}

export class Cost {
    value: number;
    category: Category;
    description: string;
    date: Date;
    type: TypeCost;
    createdby: User;

    constructor(info: ICost) {
        if (info.value < 0) throw new Error("value cost is negative")
        for (const k in info) {
            if (k == "category") {
                this[k] = new Category(info[k])
            } else if (k == "createdby") {
                this[k] = new User(info[k])
            } else {
                this[k] = info[k]
            }
        }
    }
}