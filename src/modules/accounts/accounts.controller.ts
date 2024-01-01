import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseAccountDto } from './dto/response-account.dto';
import { CurrentAccount } from 'src/integrations/auth/auth.decorator';
import { Account } from './entities/account.entity';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create Account',
    description: 'Creates `Account`',
  })
  @ApiCreatedResponse({
    type: ResponseAccountDto,
  })
  @ApiBadRequestResponse({
    description: 'username already exist',
  })
  async create(
    @Body() createAccountDto: CreateAccountDto,
  ): Promise<ResponseAccountDto> {
    return await this.accountsService.create(createAccountDto);
  }

  // @Get()
  // @ApiOperation({
  //   summary: 'Find all Accounts',
  //   description: 'Finds all `Accounts`',
  // })
  // @ApiOkResponse({
  //   type: [ResponseAccountDto],
  // })
  // @ApiBearerAuth()
  // async findAll(): Promise<ResponseAccountDto[]> {
  //   return await this.accountsService.findAll();
  // }

  @Get(':id')
  @ApiOperation({
    summary: 'Find an Account',
    description: 'Finds an `Account` by the provided `Id`',
  })
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiOkResponse({
    type: ResponseAccountDto,
  })
  @ApiNotFoundResponse({
    description: 'account not found',
  })
  @ApiBearerAuth()
  async findOne(
    @Param('id') id: string,
    @CurrentAccount() currentAccount: Account,
  ): Promise<ResponseAccountDto> {
    if (id != currentAccount.id) throw new UnauthorizedException();
    return await this.accountsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update Account',
    description: 'Updates `Account` by the provided `Id`',
  })
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiOkResponse({
    type: ResponseAccountDto,
  })
  @ApiBadRequestResponse({
    description: 'username already exist',
  })
  @ApiNotFoundResponse({
    description: 'account not found',
  })
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateAccountDto: UpdateAccountDto,
    @CurrentAccount() currentAccount: Account,
  ): Promise<ResponseAccountDto> {
    if (id != currentAccount.id) throw new UnauthorizedException();
    return await this.accountsService.update(id, updateAccountDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remove `Account`',
    description: 'Removes `Account` by the provided `Id`',
  })
  @ApiParam({
    name: 'id',
    type: String,
  })
  @ApiOkResponse()
  @ApiNotFoundResponse({
    description: 'account not found',
  })
  @ApiBearerAuth()
  async remove(
    @Param('id') id: string,
    @CurrentAccount() currentAccount: Account,
  ): Promise<void> {
    if (id != currentAccount.id) throw new UnauthorizedException();
    await this.accountsService.remove(id);
  }
}
