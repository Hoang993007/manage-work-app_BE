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
}

export const strategyName = {
  LOCAL_ADMIN: 'local-admin',
  ADMIN_JWT: 'admin-jwt',
  USER_JWT: 'user-jwt',
  USER_JWT_REFERSH: 'jwt-refresh',
  USER_LOCAL: 'user-local'
}

export const errorNameType = {
  MONGO_SERVER_ERROR: 'MongoServerError',
  HTTP_EXCEPTION: 'HttpException'
}