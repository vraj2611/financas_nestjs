import { Injectable } from "@nestjs/common";
import { CredentialService } from "src/services/credentials.service";
import { Role } from "src/entities/credential.entity";

@Injectable()
export class PermissionStrategy {
    
    constructor(private serv: CredentialService){}

    async validate(req:any, role: Role):Promise<boolean>{
        console.log({"method":req.method, "url":req.url, "user":req.user})
        //const credentials = await this.serv.listByUser();
        return true;
    }
}

