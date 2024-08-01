import {  MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { ApiGatewayService } from "./api-gateway.service";
import { ReverseProxyTaskMiddleware } from "./middleware/proxy.task.middleware";
import { ReverseProxyAuthMiddleware } from "./middleware/proxy.auth.middleware";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    validationSchema: Joi.object({
      PORT: Joi.number().required(),
      ALLOWED_ORIGIN1: Joi.string().required(),
      ALLOWED_ORIGIN2: Joi.string(),
      ALLOWED_ORIGIN3: Joi.string(),
    }),
    envFilePath: "./apps/api-gateway/.env"
  })],
  controllers: [],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ReverseProxyTaskMiddleware)
      .forRoutes({ path: "v1/task-service/*", method: RequestMethod.ALL });

    consumer
    .apply(ReverseProxyAuthMiddleware)
    .forRoutes({ path: 'v1/auth-service/*', method: RequestMethod.ALL });

  }
}
