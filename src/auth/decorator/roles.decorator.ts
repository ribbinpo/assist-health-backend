import { SetMetadata } from '@nestjs/common';
import { ROLES } from '../enum/roles.enum';

export const ROLE_KEYS = 'roles';
export const Roles = (...roles: ROLES[]) => SetMetadata(ROLE_KEYS, roles);
