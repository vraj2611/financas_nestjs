import { SetMetadata, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

export enum Permission {
    SYSTEM_ADMIN = 'SYSTEM_ADMIN',
    SYSTEM_AUDITOR = 'SYSTEM_AUDITOR',
    PROJECT_OWNER = 'PROJECT_OWNER',
    PROJECT_AUDITOR = 'PROJECT_AUDITOR',
    PROJECT_PLANNER = 'PROJECT_PLANNER',
    PROJECT_CONTRACTOR = 'PROJECT_CONTRACTOR'
}

export const RequirePermission = (permission: Permission) => SetMetadata('PERMISSION', permission);

export function routePermission(reflector: Reflector, context: ExecutionContext): Permission {
    return reflector.getAllAndOverride<Permission>('PERMISSION', [
        context.getHandler(),
        context.getClass(),
    ]);
}

export const DoNotRequirePermission = () => SetMetadata('DO_NOT_REQUIRE', true);

export function doNotRequirePermission(reflector: Reflector, context: ExecutionContext): boolean {
    return reflector.getAllAndOverride<boolean>('DO_NOT_REQUIRE', [
        context.getHandler(),
        context.getClass(),
    ]);
}
