import { TypeCost } from "src/entities/cost.entity";

export class CreateCostDto {
    value: number;
    category: string;
    description: string;
    date: Date;
    type: TypeCost;
    user?: string;
}
