import { HttpStatus, Injectable } from '@nestjs/common';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { CreateBookArgs } from './args/create-book.args';
import { UpdateBookArgs } from './args/update-book.args';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookEntity: Repository<Book>,
  ) {}

  async findAllBooks(): Promise<any> {
    const books = await this.bookEntity.find();
    return books;
    // return res.status(200).send({ message: 'All books list', books });
  }

  async findById(id: string): Promise<any> {
    const book = await this.bookEntity.findOne({ where: { id } });
    return book;
    // return res.status(200).send({ message: 'Book by given ID', book });
  }

  async deleteBook(id: string): Promise<any> {
    await this.bookEntity.delete(id);
    // return res.status(200).send({ message: 'Book has been deleted' });
    return 'Book has been deleted';
  }

  async createBook(createBookArgs: CreateBookArgs): Promise<any> {
    const { title, price } = createBookArgs;

    await this.bookEntity.save({ title, price });
    // return res
    //   .status(201)
    //   .send({ message: 'Book has been successfully added.' });
    return 'Book has been successfully added.';
  }

  async updateBook(updateBookArgs: UpdateBookArgs): Promise<any> {
    const book: Book = await this.bookEntity.findOne({
      where: { id: updateBookArgs.id },
    });

    book.title = updateBookArgs.title;
    book.price = updateBookArgs.price;

    await this.bookEntity.save(book);
    // return res
    //   .status(201)
    //   .send({ message: 'Book has been successfully updated.' });
    return 'Book has been successfully updated.';
  }
}
