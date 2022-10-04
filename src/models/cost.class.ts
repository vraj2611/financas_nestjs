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
    createdBy: IUser | User;
}

export class Cost {
    value: number;
    category: Category;
    description: string;
    date: Date;
    type: TypeCost;
    createdBy: User;

    constructor(info: ICost) {
        if (info.value < 0) throw new Error("value cost is negative")
        for (const k in info) {
            if (k == "category") {
                this[k] = (info[k].constructor.name == 'Category') ? info[k] : new Category(info[k])
            } else if (k == "createdBy") {
                this[k] = (info[k].constructor.name == 'User') ? <User>info[k] : new User(info[k])
            } else {
                this[k] = info[k]
            }
        }
    }
}