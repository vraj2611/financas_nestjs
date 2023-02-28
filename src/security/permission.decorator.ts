import { SetMetadata, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "src/entities/credential.entity";

export const RequireRole = (role: Role) => SetMetadata('ROLE', role);

export function routePermission(reflector: Reflector, context: ExecutionContext): Role {
    return reflector.getAllAndOverride<Role>('ROLE', [
        context.getHandler(),
        context.getClass(),
    ]);
}

export const DoNotRequireRole = () => SetMetadata('DO_NOT_REQUIRE', true);

export function doNotRequireRole(reflector: Reflector, context: ExecutionContext): boolean {
    return reflector.getAllAndOverride<boolean>('DO_NOT_REQUIRE', [
        context.getHandler(),
        context.getClass(),
    ]);
}
