import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from 'src/dtos/createCategoryDto.class';
import { ICategory } from 'src/models/category.class';
import { CostRepository } from 'src/repositories/costs.repository';

@Injectable()
export class CategoriesService {

    constructor(private repo: CostRepository){}

    async createCategory(dto:CreateCategoryDto): Promise<ICategory> {

        const proj = await this.getCategory(dto.name);
        if (proj) throw "Category already exists";
        
        await this.repo.save({
            name: dto.name,
            description: dto.description
        })

        return this.getCategory(dto.name);
    }

    async getCategory(name: string): Promise<ICategory> {
        return this.repo.getBy('name', name);
    }

    async listCategories():Promise<ICategory[]> {
        return this.repo.listAll();
    }

}
