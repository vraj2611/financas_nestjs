import { DatastoreRepository } from "./datastore.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CostRepository extends DatastoreRepository {

    constructor(){
        super('Cost', [])
    }
}