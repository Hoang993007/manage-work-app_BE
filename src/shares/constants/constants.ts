import * as config from 'config';

export const APP_PORT = config.has('app.port') ? config.get<number>('app.port') : 3000;
export const API_PREFIX = config.has('app.api_prefix') ? config.get<string>('app.api_prefix') : '';

export const OPEN_API_TITLE = config.get<string>('open_api.title');
export const OPEN_API_DESCRIPTION = config.get<string>('open_api.description');
export const OPEN_API_VERSION = config.get<string>('open_api.version');

export const AUTH_SECRET = config.get<string>('app.auth_secret');
export const AUTH_EXPIRES_IN = config.get<number>('app.auth_expires_in');

export const AUTH_REFRESH_SECRET = config.get<string>('app.auth_refresh_secret');
export const AUTH_REFRESH_EXPIRES_IN = config.get<number>('app.auth_refresh_expires_in');

export const COOKIES_SECRET = config.get<string>('app.cookies_secret');

export const authSecurityName = {
  BASIC_AUTH: 'BasicAuth',
  JWT_AUTH: 'JWTAuth'
}