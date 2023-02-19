import { DatastoreRepository } from "./datastore.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository extends DatastoreRepository {

    constructor(){
        super('User', ['name', 'password'])
    }
}