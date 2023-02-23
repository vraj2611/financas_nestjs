import { SetMetadata, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

export const Public = () => SetMetadata('PUBLIC_ROUTE', true);

export function isPublicRoute(reflector: Reflector, context: ExecutionContext): boolean {
    return reflector.getAllAndOverride<boolean>('PUBLIC_ROUTE', [
        context.getHandler(),
        context.getClass(),
    ]);
}
