export const adminRole = {
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN'
}
export const adminRoleEnum = Object.values(adminRole);

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

export const dayOfWeek = {
  SUNDAY: 'sunday',
  MONDAY: 'monday',
  TUESDAY: 'tuesday',
  WEDNESDAY: 'wednesday',
  THURSDAY: 'thursday',
  FRIDAY: 'friday',
  SATURDAY: 'saturday',
}
export const dayOfWeekEnum = Object.values(dayOfWeek);

export const monthOfYear = {
  JANUARY: 'January',
  FEBRUARY: 'February',
  MARCH: 'March',
  APRIL: "April",
  MAY: "May",
  JUNE: "June",
  JULY: "July",
  AUGUST: "August",
  SEPTEMBER: "September",
  OCTOBER: "October",
  NOVEMBER: "November",
  DECEMBER: "December"
}
export const monthOfYearEnum = Object.values(monthOfYear);