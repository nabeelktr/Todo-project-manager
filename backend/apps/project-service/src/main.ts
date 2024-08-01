import { NestFactory } from '@nestjs/core';
import { ProjectServiceModule } from './project-service.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ProjectServiceModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'), () => {
    console.log("Project-service is listening..");
  });
}
bootstrap();
