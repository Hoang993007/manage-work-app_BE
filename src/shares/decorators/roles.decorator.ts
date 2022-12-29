import { appMetadataName } from '../constants/constants';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata(appMetadataName.ADMIN_ROLES, roles);
