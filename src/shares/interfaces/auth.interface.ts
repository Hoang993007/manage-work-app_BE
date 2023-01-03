interface AuthJwtPayload {
  usernameOrEmail: string;
  iss?: string;
  exp?: number;
  sub?: string;
  aud?: string;
}

interface AdminAuthJwtPayload {
  username: string;
  role: string;
  iss?: string;
  exp?: number;
  sub?: string;
  aud?: string;
}