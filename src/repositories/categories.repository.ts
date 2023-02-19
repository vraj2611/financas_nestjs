import { DatastoreRepository } from "./datastore.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoryRepository extends DatastoreRepository {

    constructor(){
        super('Category', [])
    }
}