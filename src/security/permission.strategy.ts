import { Injectable } from "@nestjs/common";
import { Ability, AbilityBuilder, InferSubjects, AbilityClass, ExtractSubjectType } from '@casl/ability';
import { Project } from "src/models/project.class";
import { Category } from "src/models/category.class";
import { Cost } from "src/models/cost.class";
import { User } from "src/models/user.class";
import { CredentialService } from "src/services/roles.service";
import { Permission } from "./permission.decorator";

export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
  }

export type Subjects = InferSubjects<typeof Project | typeof Category | typeof Cost> | 'all';
export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class PermissionStrategy {
    
    constructor(private serv: CredentialService){}

    async validate(req:any, permission: Permission):Promise<boolean>{
        //console.log({ req });
        const user_ability = await this.userAbility(req.user);
        const { action, subject } = await this.permissionAbility(permission)
        return user_ability.can(action, subject);
    }

    private async permissionAbility(permission: Permission):Promise<{action:Action, subject:any}> {
        return null
    }

    private async userAbility(user_id: string) {
        const { can, cannot, build } = new AbilityBuilder<
            Ability<[Action, Subjects]>
        >(Ability as AbilityClass<AppAbility>);

        const roles = await this.serv.listByUser(user_id);

        // for (const r of roles) {
        //     if (r)

        // }
        // if (user.isAdmin) {
            can(Action.Manage, 'all');
        // } else {
        //     can(Action.Read, 'all');
        // }

        //can(Action.Update, Article, { authorId: user.id });
        //cannot(Action.Delete, Article, { isPublished: true });

        return build({
            // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<Subjects>,
        });
    }
}

