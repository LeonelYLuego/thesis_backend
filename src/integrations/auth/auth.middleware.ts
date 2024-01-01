import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { Account } from '@accounts/entities/account.entity';

interface RequestWithAccount extends Request {
  account?: Account;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async use(req: RequestWithAccount, res: Response, next: NextFunction) {
    if (
      (req.originalUrl == '/auth/log-in' && req.method == 'POST') ||
      (req.originalUrl == '/accounts' && req.method == 'POST')
    )
      next();
    else {
      try {
        req.account = await this.authService.logged(
          this.extractTokenFromHeader(req),
        );
        next();
      } catch {
        res.status(401).end();
      }
    }
  }
}
