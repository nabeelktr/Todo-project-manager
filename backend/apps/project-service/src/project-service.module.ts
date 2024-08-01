import { Module } from '@nestjs/common';
import * as Joi from 'joi'
import { ProjectServiceController } from './project-service.controller';
import { ProjectServiceService } from './project-service.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/project-service/.env',
    }),
  ],
  controllers: [ProjectServiceController],
  providers: [ProjectServiceService],
})
export class ProjectServiceModule {}
