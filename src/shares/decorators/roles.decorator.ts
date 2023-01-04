import { appMetadataName } from './../constants/constants';

import { SetMetadata } from '@nestjs/common';

export const Roles = (roles: string[] | string) => SetMetadata(appMetadataName.ADMIN_ROLES, typeof roles === 'string'? [roles] : roles);
