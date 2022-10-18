import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES } from '../enum/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<ROLES[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(requiredRoles);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const checkRole = requiredRoles.some((role) => user?.roles?.includes(role));
    console.log(checkRole);
    if (!checkRole) throw new ForbiddenException('Unauthorized');
    return checkRole;
  }
}
