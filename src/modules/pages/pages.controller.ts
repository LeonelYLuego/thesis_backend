import { Controller, Get, Post, Body, Patch, Delete } from '@nestjs/common';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Page } from './entities/page.entity';
import { CurrentAccount } from 'src/integrations/auth/auth.decorator';
import { Account } from '@accounts/entities/account.entity';

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
    description: 'account already with page',
  })
  @ApiBearerAuth()
  async create(
    @Body() createPageDto: CreatePageDto,
    @CurrentAccount() currentAccount: Account,
  ): Promise<Page> {
    return await this.pagesService.create(createPageDto, currentAccount);
  }

  // @Get()
  // findAll() {
  //   return this.pagesService.findAll();
  // }

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
    await this.remove(currentAccount);
  }
}
