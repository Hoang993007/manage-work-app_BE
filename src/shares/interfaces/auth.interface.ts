interface AuthJwtPayload {
  usernameOrEmail: string;
  iss?: string;
  exp?: number;
  sub?: string;
  aud?: string;
}