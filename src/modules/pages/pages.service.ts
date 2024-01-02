import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { Account } from '@accounts/entities/account.entity';
import { Page } from './entities/page.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(Page) private pagesRepository: Repository<Page>,
  ) {}

  /**
   * @throws {BadRequestException} account already with page
   */
  async create(
    createPageDto: CreatePageDto,
    currentAccount: Account,
  ): Promise<Page> {
    if (
      await this.pagesRepository.findOne({
        where: { account: { id: currentAccount.id } },
      })
    )
      throw new BadRequestException('account already with page');

    const page = await this.pagesRepository.save({
      account: currentAccount,
      ...createPageDto,
    });

    return await this.findOne(currentAccount);
  }

  // findAll() {
  //   return `This action returns all pages`;
  // }

  /**
   * @throws {NotFoundException} page not found
   */
  async findOne(currentAccount: Account): Promise<Page> {
    const page = await this.pagesRepository.findOne({
      where: { account: { id: currentAccount.id } },
    });
    if (page) return page;
    throw new NotFoundException('page not found');
  }

  // update(id: number, updatePageDto: UpdatePageDto) {
  //   return `This action updates a #${id} page`;
  // }

  /**
   * @throws {NotFoundException} page not found
   */
  async remove(currentAccount: Account): Promise<void> {
    await this.findOne(currentAccount);

    await this.pagesRepository.delete({ account: { id: currentAccount.id } });
  }
}
