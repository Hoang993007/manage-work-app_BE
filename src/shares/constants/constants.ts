export const adminRole = {
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN'
}
export const adminRoleArr = Object.keys(adminRole);

export const appMetadataName = {
  ADMIN_ROLES: 'ADMIN_ROLES'
}

export const authSecurityName = {
  BASIC_AUTH: 'BasicAuth',
  JWT_AUTH: 'JWTAuth',
  ADMIN_JWT_AUTH: 'AdminJWTAuth'
}

export const errorNameType = {
  MONGO_SERVER_ERROR: 'MongoServerError',
  HTTP_EXCEPTION: 'HttpException'
}