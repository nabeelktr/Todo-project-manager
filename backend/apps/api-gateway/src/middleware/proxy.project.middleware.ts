import { NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

export class ReverseProxyProjectMiddleware implements NestMiddleware {
  private proxy = createProxyMiddleware({
    target: "http://project-service:3002/",
    pathRewrite: {
      "/api/v1/project-service": "/",
    },
    changeOrigin: true,
    secure: false,
    on: {
      proxyReq: (proxyReq, req, res) => {
        console.log(
          "[NestMiddleware]: Proxying",
          req.method,
          "request originally made to"
        );
      },
    },
  });

  use(req: Request, res: Response, next: () => void) {
    this.proxy(req, res, next);
  }
}
