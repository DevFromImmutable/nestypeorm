
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface UpdateBookArgs {
    id: string;
    title: string;
    price: number;
}

export interface CreateBookArgs {
    title: string;
    price: number;
}

export interface Book {
    id: string;
    title: string;
    price: number;
}

export interface IQuery {
    index(): string | Promise<string>;
    books(): Book[] | Promise<Book[]>;
    bookById(bookId: string): Book | Promise<Book>;
}

export interface IMutation {
    deleteBook(bookId: string): string | Promise<string>;
    updateBook(updateBookArgs: UpdateBookArgs): string | Promise<string>;
    createBook(createBookArgs: CreateBookArgs): string | Promise<string>;
}

type Nullable<T> = T | null;
