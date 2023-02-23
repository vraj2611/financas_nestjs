import { SetMetadata, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

export enum Permission {
    MANAGE_ALL = 'MANAGE_ALL',
    UPDATE_PROJECT = 'UPDATE_PROJECT',
    CREATE_PAID_COST = 'CREATE_PAID_COST',
    CREATE_PLANNED_COST = 'CREATE_PLANNED_COST',
    UPDATE_COST = 'UPDATE_COST'
}

export const RequirePermission = (permission: Permission) => SetMetadata('PERMISSION', permission);

export function routePermission(reflector: Reflector, context: ExecutionContext): Permission {
    return reflector.getAllAndOverride<Permission>('PERMISSION', [
        context.getHandler(),
        context.getClass(),
    ]);
}

export const NoRestriction = () => SetMetadata('NO_RESTRICTION', true);

export function isNoRestriction(reflector: Reflector, context: ExecutionContext): boolean {
    return reflector.getAllAndOverride<boolean>('NO_RESTRICTION', [
        context.getHandler(),
        context.getClass(),
    ]);
}

