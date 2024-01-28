import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
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
import { Page } from './entities/page.entity';
import { CurrentAccount } from 'src/integrations/auth/auth.decorator';
import { Account } from '@accounts/entities/account.entity';
import { ResponseAcceptDto } from './dto/response-accept.dto';

@ApiTags('Pages')
@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create Page',
    description: 'Creates `Page`',
  })
  @ApiCreatedResponse({
    type: Page,
  })
  @ApiBadRequestResponse({
    description: 'account already with page, url already exist',
  })
  @ApiBearerAuth()
  async create(
    @Body() createPageDto: CreatePageDto,
    @CurrentAccount() currentAccount: Account,
  ): Promise<Page> {
    return await this.pagesService.create(createPageDto, currentAccount);
  }

  @Get(':id/accept')
  @ApiOperation({
    summary: 'Accept OAuth',
    description: 'Accepts OAuth',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiCreatedResponse({
    type: ResponseAcceptDto,
  })
  @ApiNotFoundResponse({
    description: 'page not found',
  })
  @ApiBearerAuth()
  async accept(
    @Param('id') id: string,
    @CurrentAccount() currentAccount: Account,
  ): Promise<ResponseAcceptDto> {
    return await this.pagesService.accept(id, currentAccount);
  }

  @Get()
  @ApiOperation({
    summary: 'Find Page',
    description: 'Finds Page',
  })
  @ApiOkResponse({
    type: Page,
  })
  @ApiNotFoundResponse({
    description: 'page not found',
  })
  @ApiBearerAuth()
  async findOne(@CurrentAccount() currentAccount: Account): Promise<Page> {
    return await this.pagesService.findOne(currentAccount);
  }

  @Get(':publicKey')
  @ApiOperation({
    summary: 'Find Page by Public Key',
    description: 'Finds Page by Public Key',
  })
  @ApiParam({
    name: 'publicKey',
    type: String,
  })
  @ApiNotFoundResponse({
    description: 'page not found',
  })
  async findOneByPublicKey(
    @Param('publicKey') publicKey: string,
  ): Promise<Page> {
    return await this.pagesService.findOneByPublicKey(publicKey);
  }

  // @Patch('')
  // update(@Param('id') id: string, @Body() updatePageDto: UpdatePageDto) {
  //   return this.pagesService.update(+id, updatePageDto);
  // }

  @Delete('')
  @ApiOperation({
    summary: 'Remove Page',
    description: 'Removes `Page`',
  })
  @ApiOkResponse()
  @ApiNotFoundResponse({
    description: 'page not found',
  })
  @ApiBearerAuth()
  async remove(@CurrentAccount() currentAccount: Account): Promise<void> {
    await this.pagesService.remove(currentAccount);
  }
}
