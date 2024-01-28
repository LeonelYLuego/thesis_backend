import { ApiProperty } from '@nestjs/swagger';
import { Page } from 'src/modules/pages/entities/page.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Account {
  @ApiProperty({
    pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
  })
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

  @ApiProperty({ type: [Page] })
  @ManyToMany(() => Page)
  @JoinTable()
  pages: Page[];
}
