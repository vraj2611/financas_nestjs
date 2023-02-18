import { TypeCost } from "src/models/cost.class";

export class CreateCostDto {
    value: number;
    category: string;
    description: string;
    date: Date;
    type: TypeCost;
    user?: string;
}
