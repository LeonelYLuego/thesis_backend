import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Account {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @CreateDateColumn()
  createdOn: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updateOn: Date;

  @ApiProperty({
    pattern: '^[a-z.]*$',
  })
  @Column({
    length: 32,
    unique: true,
  })
  username: string;

  @ApiProperty()
  @Column({
    length: 64,
  })
  firstName: string;

  @ApiProperty()
  @Column({
    length: 64,
  })
  lastName: string;

  @ApiProperty()
  @Column({
    select: false,
    length: 64,
  })
  passwordHash: string;

  @ApiProperty()
  @Column({
    length: 10,
  })
  phone: string;
}
