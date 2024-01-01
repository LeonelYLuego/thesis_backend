import { ApiProperty } from '@nestjs/swagger';
import { ResponseAccountDto } from 'src/modules/accounts/dto/response-account.dto';
import { Account } from 'src/modules/accounts/entities/account.entity';

export class ResponseLogInDto {
  @ApiProperty()
  token: string;

  @ApiProperty({
    type: ResponseAccountDto,
  })
  account: Account;
}
