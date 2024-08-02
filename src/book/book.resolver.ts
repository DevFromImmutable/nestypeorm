import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Book } from './schema/book.schema';
import { BookService } from './book.service';
import { Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateBookArgs } from './args/create-book.args';
import { UpdateBookArgs } from './args/update-book.args';

@Resolver((of) => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Query((returns) => [Book], { name: 'books' })
  getAllBooks(@Res() res: Response) {
    return this.bookService.findAllBooks();
  }

  @Query((returns) => Book, { name: 'bookById' })
  getBookById(
    @Res() res: Response,
    @Args({ name: 'bookId', type: () => String }) id: string,
  ) {
    return this.bookService.findById(id);
  }

  @Mutation((returns) => String, { name: 'deleteBook' })
  deleteBookById(
    @Res() res: Response,
    @Args({ name: 'bookId', type: () => String }) id: string,
  ) {
    return this.bookService.deleteBook(id);
  }

  @Mutation((returns) => String, { name: 'updateBook' })
  updateBookById(
    @Res() res: Response,
    @Args('updateBookArgs') updateBookArgs: UpdateBookArgs,
  ) {
    return this.bookService.updateBook(updateBookArgs);
  }

  @Mutation((returns) => String, { name: 'createBook' })
  createBook(
    @Res() res: Response,
    @Args('createBookArgs') createBookArgs: CreateBookArgs,
  ) {
    return this.bookService.createBook(createBookArgs);
  }
}

// https://talk.brave.com/G-hkDmqiZKHKEoQ0znTFyj3AqEhjsK-AmcXzrmzvyz4
