import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { FindOneOptions, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Page } from '../pages/entities/page.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account) private accountsRepository: Repository<Account>,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, await bcrypt.genSalt());
  }

  private async checkIfUsernameExist(username: string): Promise<void> {
    if (await this.accountsRepository.findOne({ where: { username } }))
      throw new BadRequestException('username already exist');
  }

  /**
   * @throws {BadRequestException} username already exist
   */
  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    await this.checkIfUsernameExist(createAccountDto.username);
    const createdAccount = await this.accountsRepository.save({
      passwordHash: await this.hashPassword(createAccountDto.password),
      ...createAccountDto,
    });
    return await this.findOne(createdAccount.id);
  }

  async findOneBy(options: FindOneOptions<Account>): Promise<Account | null> {
    return await this.accountsRepository.findOne(options);
  }

  async findAll(): Promise<Account[]> {
    return await this.accountsRepository.find();
  }

  /**
   * @throws {NotFoundException} account not found
   */
  async findOne(id: string): Promise<Account> {
    const account = await this.accountsRepository.findOne({ where: { id } });
    if (account) return account;
    throw new NotFoundException('account not found');
  }

  /**
   * @throws {NotFoundException} account not found
   * @throws {BadRequestException} username already exist
   */
  async update(id: string, updateAccountDto: UpdateAccountDto) {
    await this.findOne(id);
    if (updateAccountDto.username)
      await this.checkIfUsernameExist(updateAccountDto.username);
    if (updateAccountDto.password) {
      updateAccountDto['passwordHash'] = await this.hashPassword(
        updateAccountDto.password,
      );
      delete updateAccountDto['password'];
    }
    await this.accountsRepository.update({ id }, updateAccountDto);
    return await this.findOne(id);
  }

  /**
   * @throws {NotFoundException} account not found
   */
  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.accountsRepository.delete({ id });
  }

  async checkIfPageRegistered(
    pageId: string,
    currentAccount: Account,
  ): Promise<boolean> {
    return !!(await this.accountsRepository.findOne({
      where: { id: currentAccount.id, pages: { id: pageId } },
    }));
  }

  async registerPage(page: Page, currentAccount: Account): Promise<void> {
    const account = await this.accountsRepository.findOne({
      where: { id: currentAccount.id },
      relations: { pages: true },
    });
    account.pages.push(page);
    await this.accountsRepository.save(account);
  }

  async findPages(currentAccount: Account): Promise<Page[]> {
    const account = await this.accountsRepository.findOne({
      relations: {
        pages: true,
      },
      select: {
        pages: {
          id: true,
          name: true,
          url: true,
        },
      },
      where: {
        id: currentAccount.id,
      },
    });

    return account.pages;
  }
}
