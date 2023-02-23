import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from "@nestjs/core";
import { isPublicRoute } from "./public.decorator";

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {

    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        if (isPublicRoute(this.reflector, context)) return true
        return super.canActivate(context);
    }
}
