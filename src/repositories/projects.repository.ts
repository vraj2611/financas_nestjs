import { DatastoreRepository } from "./datastore.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProjectRepository extends DatastoreRepository {

    constructor(){
        super('Project', [])
    }
}