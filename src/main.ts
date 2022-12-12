/**
 * Must import env at top of main.ts file so env will be loaded before any initialization of any module
 * Json file/ts file will be complied parallel with main file
 * Do this and env variables can be used at the time those files are complied 
 **/
import * as dotenv from 'dotenv';
const env = dotenv.config({ path: '.env' });
console.log("ENV", env);

// Test dotenv engine which parses the contents of file containing environemnt
const buf = Buffer.from('BASIC=basic')
const configTest = dotenv.parse(buf)
console.log(typeof configTest, configTest)

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

process.env["NODE_CONFIG_DIR"] = `./config`;
import * as config from 'config';
import { RequestMethod } from '@nestjs/common';

const appPort = config.has('app.port') ? config.get<number>('app.port') : 3000;
const apiPrefix = config.has('app.api_prefix') ? config.get<string>('app.api_prefix') : '';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(apiPrefix, {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });

  const openApiConfig = new DocumentBuilder()
    .setTitle(config.get<string>('open_api.title'))
    .setDescription(config.get<string>('open_api.description'))
    .setVersion(config.get<string>('open_api.version'))
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, openApiConfig);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(appPort);
}
bootstrap();
