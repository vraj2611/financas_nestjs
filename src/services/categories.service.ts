import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from 'src/dtos/createCategoryDto.class';
import { ICategory } from 'src/models/category.class';
import { Repository } from './repository.class';

@Injectable()
export class CategoriesService {

    private repo: Repository;

    constructor() {
        this.repo = new Repository("Category", [])
    }

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
