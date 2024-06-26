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
import { ResponseAcceptDto } from './dto/response-accept.dto';
import { AccountsService } from '@accounts/accounts.service';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(Page) private pagesRepository: Repository<Page>,
    private accountsService: AccountsService,
  ) {}

  private generateKey(): string {
    const characters = '0123456789ABCDEF';
    let result = '';

    for (let i = 0; i < 32; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  /**
   * @throws {BadRequestException} account already with page
   * @throws {BadRequestException} url already exist
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

    if (
      await this.pagesRepository.findOne({
        where: { url: createPageDto.url },
      })
    )
      throw new BadRequestException('url already exist');

    await this.pagesRepository.save({
      account: currentAccount,
      publicKey: this.generateKey(),
      privateKey: this.generateKey(),
      ...createPageDto,
    });

    return await this.findOne(currentAccount);
  }

  /**
   * @throws {NotFoundException} page not found
   */
  async accept(
    id: string,
    currentAccount: Account,
  ): Promise<ResponseAcceptDto> {
    const page = await this.pagesRepository.findOne({
      where: { id },
    });
    if (!page) throw new NotFoundException('page not found');
    if (
      !(await this.accountsService.checkIfPageRegistered(
        page.id,
        currentAccount,
      ))
    )
      await this.accountsService.registerPage(page, currentAccount);

    //Encrypt
    return {
      value: CryptoJS.AES.encrypt(
        JSON.stringify({
          id: currentAccount.id,
          firstName: currentAccount.firstName,
          lastName: currentAccount.lastName,
          username: currentAccount.username,
        }),
        CryptoJS.enc.Utf8.parse(page.privateKey),
        {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        },
      ).toString(),
    };
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

  /**
   * @throws {NotFoundException} page not found
   */
  async findOneByPublicKey(publicKey: string): Promise<Page> {
    const page = await this.pagesRepository.findOne({
      where: { publicKey },
      select: {
        id: true,
        name: true,
        url: true,
      },
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
