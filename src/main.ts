/**
 * Must import env at top of main.ts file so env will be loaded before any initialization of any module
 * Json file/ts file will be complied parallel with main file
 * Do this and env variables can be used at the time those files are complied 
 **/
import * as dotenv from 'dotenv';
const env = dotenv.config({ path: '.env' });

import { NestFactory } from '@nestjs/core';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { API_PREFIX, APP_PORT, OPEN_API_TITLE, OPEN_API_DESCRIPTION, OPEN_API_VERSION, COOKIES_SECRET } from './shares/constants/env.constants';
import { authSecurityName } from './shares/constants/constants';

const logger = new Logger();
logger.log(env);

// Test dotenv engine which parses the contents of file containing environemnt
const buf = Buffer.from('BASIC=basic')
const configTest = dotenv.parse(buf)
logger.log(typeof configTest, configTest)

// set config directory for config library
process.env["NODE_CONFIG_DIR"] = `./config`;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(API_PREFIX, {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });

  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: false,
    whitelist: true, // filter out properties that should not be received by the method handler.
    forbidNonWhitelisted: false,
    transform: true,
  }));

  // this use cannot inject dependencies since this is done outside the context of any module. 
  // app.useGlobalInterceptors(new LoggingInterceptor());

  app.use(cookieParser(COOKIES_SECRET));

  app.enableCors();

  const openApiConfig = new DocumentBuilder()
    .setTitle(OPEN_API_TITLE)
    .setDescription(OPEN_API_DESCRIPTION)
    .setVersion(OPEN_API_VERSION)
    .addSecurity(authSecurityName.BASIC_AUTH, {
      type: 'http',
      scheme: 'basic',
    })
    .addSecurity(authSecurityName.JWT_AUTH, {
      type: 'http',
      scheme: 'bearer'
    })
    .addSecurity(authSecurityName.ADMIN_JWT_AUTH, {
      type: 'http',
      scheme: 'bearer'
    })
    .build();
  const document = SwaggerModule.createDocument(app, openApiConfig);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(APP_PORT);
}
bootstrap();
