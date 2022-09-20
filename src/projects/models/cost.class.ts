import { Category } from "./category.class";

export enum TypeCost {
    PLANNED,
    PAID
}

export class Cost {
    value: number;
    category: Category;
    description: string;
    date: Date;
    type: TypeCost;
}