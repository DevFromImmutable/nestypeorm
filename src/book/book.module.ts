import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BookService } from './book.service';
import { BookResolver } from './book.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [],
  providers: [BookService, BookResolver],
})
export class BookModule {}
