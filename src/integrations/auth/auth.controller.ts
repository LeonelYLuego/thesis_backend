import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ResponseLogInDto } from './dto/response-log-in.dto';
import { LogInDto } from './dto/log-in.dto';
import { AuthService } from './auth.service';
import { ResponseAccountDto } from '@accounts/dto/response-account.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('log-in')
  @ApiOperation({
    summary: 'Log in Account',
    description:
      'Checks if the credentials are correct, and if the are responses an access token',
  })
  @ApiCreatedResponse({
    type: ResponseLogInDto,
  })
  @ApiUnauthorizedResponse()
  async logIn(@Body() credentials: LogInDto): Promise<ResponseLogInDto> {
    return await this.authService.logIn(credentials);
  }

  @Get('logged')
  @ApiOperation({
    summary: 'Logged Account',
    description: 'Checks the logged `Account` and returns it',
  })
  @ApiOkResponse({
    type: ResponseAccountDto
  })
  @ApiBearerAuth()
  async logged(): Promise<ResponseAccountDto> {
    return;
  }
}
