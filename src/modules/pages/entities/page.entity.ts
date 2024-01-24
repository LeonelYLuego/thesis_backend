import { Account } from '@accounts/entities/account.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Page {
  @ApiProperty({
    pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Account, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  account: Account;

  @ApiProperty()
  @Column({
    length: 32,
  })
  name: string;

  @ApiProperty()
  @Column({
    length: 32,
  })
  publicKey: string;

  @ApiProperty()
  @Column({
    length: 32,
  })
  privateKey: string;

  @ApiProperty()
  @Column({
    length: 32,
  })
  url: string;
}
