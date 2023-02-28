import { Injectable, CanActivate, ExecutionContext, InternalServerErrorException } from "@nestjs/common"
import { PermissionStrategy } from "./permission.strategy"
import { Reflector } from "@nestjs/core"
import { isPublicRoute } from "./public.decorator"
import { doNotRequireRole, routePermission } from "./permission.decorator"

@Injectable()
export class PermissionGuard implements CanActivate {

    constructor(private strategy: PermissionStrategy, private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        if (isPublicRoute(this.reflector, context)) return true
        if (doNotRequireRole(this.reflector, context)) return true
        
        const req = context.switchToHttp().getRequest();
        const permission = routePermission(this.reflector, context);
        
        return this.strategy.validate(req, permission);
    }
}
