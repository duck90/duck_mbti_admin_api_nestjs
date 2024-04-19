import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // console.log(
    //   `[${new Date().toLocaleString()}] ${req.method} ${req.originalUrl}`,
    // );
    res.on('finish', () => {
      // console.log(
      //   `[${new Date().toLocaleString()}] ${req.method} ${req.originalUrl} ${
      //     res.statusCode
      //   }`,
      // );
    });
    next();
  }
}
