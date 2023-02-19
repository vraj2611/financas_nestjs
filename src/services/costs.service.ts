import { Injectable } from '@nestjs/common';
import { CreateCostDto } from 'src/dtos/createCostDto.class';
import { ICost } from 'src/models/cost.class';
import { CostRepository } from 'src/repositories/costs.repository';


@Injectable()
export class CostsService {

    constructor(private repo: CostRepository) {}

    // async createCost(dto:CreateCostDto): Promise<ICost> {

    //     const proj = await this.getCost(dto.name);
    //     if (proj) throw "Cost already exists";
        
    //     await this.repo.save({
    //         name: dto.name,
    //         description: dto.description
    //     })

    //     return this.getCost(dto.name);
    // }

    // async getCost(name: string): Promise<ICost> {
    //     return this.repo.getBy('name', name);
    // }

    // async listCosts():Promise<ICost[]> {
    //     return this.repo.listAll();
    // }

}
