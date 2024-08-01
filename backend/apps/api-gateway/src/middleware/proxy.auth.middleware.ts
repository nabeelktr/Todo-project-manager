import { NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

export class ReverseProxyAuthMiddleware implements NestMiddleware {
  private proxy = createProxyMiddleware({
    target: "http://auth-service:3003/",
    pathRewrite: {
      "/api/v1/auth-service": "/",
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
