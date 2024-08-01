import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { dataSourceOptions } from 'db/data.source';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    PostModule,
    AuthModule,
  ],
})
export class AppModule {}
