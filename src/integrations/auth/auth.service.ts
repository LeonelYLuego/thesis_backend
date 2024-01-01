import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ResponseLogInDto } from './dto/response-log-in.dto';
import { LogInDto } from './dto/log-in.dto';
import * as bcrypt from 'bcrypt';
import { AccountsService } from '@accounts/accounts.service';
import { JwtService } from '@nestjs/jwt';
import { Account } from '@accounts/entities/account.entity';

@Injectable()
export class AuthService {
  constructor(
    private accountsService: AccountsService,
    private jwtService: JwtService,
  ) {}

  async logIn(credentials: LogInDto): Promise<ResponseLogInDto> {
    const account = await this.accountsService.findOneBy({
      where: {
        username: credentials.username,
      },
      select: {
        id: true,
        username: true,
        passwordHash: true,
      },
    });
    if (account)
      if (await bcrypt.compare(credentials.password, account.passwordHash)) {
        const payload = {
          sub: account.id,
          username: account.username,
        };
        return {
          token: await this.jwtService.signAsync(payload),
          account: await this.accountsService.findOne(account.id),
        };
      }
    throw new UnauthorizedException();
  }

  /**
   * @throws {UnauthorizedException}
   */
  async logged(token?: string): Promise<Account> {
    try {
      if (token) {
        const payload = await this.jwtService.verifyAsync(token);
        const account = await this.accountsService.findOne(payload.sub);
        return account;
      }
    } catch {}
    throw new UnauthorizedException();
  }
}
