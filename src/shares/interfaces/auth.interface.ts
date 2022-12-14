interface AuthJwtPayload {
  email: string;
  username: string;
  iss?: string;
  exp?: number;
  sub?: string;
  aud?: string;
}