import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule, {bodyParser: false});
  const configService = app.get(ConfigService);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);


  app.enableCors({
    origin: [configService.get('ALLOWED_ORIGIN1'), configService.get('ALLOWED_ORIGIN2'), configService.get('ALLOWED_ORIGIN3')], 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(configService.get('PORT'), () => {
    console.log("Api gateway server is listening..");
  });
}
bootstrap();
