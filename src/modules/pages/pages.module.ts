import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './entities/page.entity';
import { AccountsModule } from '@accounts/accounts.module';

@Module({
  imports: [TypeOrmModule.forFeature([Page]), AccountsModule],
  controllers: [PagesController],
  providers: [PagesService],
})
export class PagesModule {}
