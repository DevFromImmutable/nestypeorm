import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { dataSourceOptions } from 'db/data.source';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.graphql'), // For Code first Approach
      definitions: {
        path: join(process.cwd(), 'src/graphql/graphql.ts'),
      },
      // typePaths: ['./**/*.graphql'], // For schema first approach
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    PostModule,
    AuthModule,
    BookModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
