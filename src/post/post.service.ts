import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { Response } from 'express';
import slugify from 'slugify';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postEntity: Repository<Post>,
  ) {}

  async create(res: Response, createPostDto: CreatePostDto): Promise<any> {
    const { title, tags, content, userId } = createPostDto;
    if (!title || !content || !userId) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'Invalid Inputs' });
    }

    const postExists = await this.postEntity.findOne({ where: { title } });
    if (postExists)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'Post with title already exists' });

    const slug = slugify(title, { trim: true, lower: true, replacement: '-' });

    await this.postEntity.save({
      title,
      content,
      tags,
      slug,
      userId,
    });

    return res.status(HttpStatus.CREATED).send({ message: 'Post added' });
  }

  async findAll(res: Response): Promise<any> {
    const posts = await this.postEntity.find();

    return res.status(200).send({
      message: 'All users list',
      posts,
    });
  }

  async findOne(res: Response, id: string): Promise<any> {
    const post = await this.postEntity.findOne({ where: { id } });

    if (!post)
      return res.status(HttpStatus.NOT_FOUND).send({
        message: 'Post not found',
      });

    return res.status(200).send({
      message: 'Post with given ID',
      post,
    });
  }

  async update(
    res: Response,
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<any> {
    const { title, content, tags } = updatePostDto;
    let slug: string;
    let post: any;

    if (title && title !== undefined) {
      slug = slugify(title, { trim: true, lower: true, replacement: '-' });
      post = await this.postEntity.update(
        { id },
        { title, slug, content, tags },
      );
    } else {
      post = await this.postEntity.update({ id }, { content, tags });
    }

    if (!post)
      return res.status(HttpStatus.NOT_FOUND).send({
        message: 'Post not found',
      });

    return res.status(200).send({
      message: 'Post updated',
    });
  }

  async remove(res: Response, id: string): Promise<any> {
    const post = await this.postEntity.delete({ id });

    if (!post)
      return res.status(HttpStatus.NOT_FOUND).send({
        message: 'Post not found',
      });

    return res.status(200).send({
      message: 'Post Deleted',
    });
  }
}
