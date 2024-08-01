import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { dataSourceOptions } from 'db/data.source';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UsersModule, PostModule],
})
export class AppModule {}
