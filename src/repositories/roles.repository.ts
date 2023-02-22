import { DatastoreRepository } from "./datastore.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RoleRepository extends DatastoreRepository {

    constructor(){
        super('Roles', [])
    }
}