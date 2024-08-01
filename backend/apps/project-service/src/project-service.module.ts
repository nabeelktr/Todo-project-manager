import { Module } from '@nestjs/common';
import { ProjectServiceController } from './controllers/project-service.controller';
import { ProjectService } from './services/project-service.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from "joi"
import { AuthModule, DatabaseModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from './schemas/project.schems';
import { Todo, TodoSchema } from './schemas/todo.schems';
import { GatewayModule } from './gateway/gateway.module';
import { ProjectRepository } from './repositories/project.repository';
import { TodoRepository } from './repositories/todo.repository';
import { redisProvider } from './redis/redis.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/project-service/.env',
    }),
    DatabaseModule,
    MongooseModule.forFeature([{name: Project.name, schema: ProjectSchema}]),
    MongooseModule.forFeature([{name: Todo.name, schema: TodoSchema}]),
    AuthModule,
    GatewayModule,
  ],
  controllers: [ProjectServiceController],
  providers: [ProjectService, ProjectRepository, TodoRepository, redisProvider],
})
export class ProjectServiceModule {}
