import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { Request, Response } from 'express';
import slugify from 'slugify';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postEntity: Repository<Post>,
  ) {}

  async create(
    req: Request,
    res: Response,
    createPostDto: CreatePostDto,
  ): Promise<any> {
    const { user }: any = req;
    const { userId }: any = user;

    if (!user || !userId) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .send({ message: 'Unauthorize Request.' });
    }

    const { title, tags, content } = createPostDto;
    if (!title || !content) {
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
    req: Request,
    res: Response,
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<any> {
    const { user }: any = req;
    const { userId }: any = user;
    const post = await this.postEntity.findOne({ where: { id, userId } });

    if (!post)
      return res.status(HttpStatus.NOT_FOUND).send({
        message: 'Post not found',
      });

    const { title, content, tags } = updatePostDto;

    if (title && title !== undefined) {
      const slug = slugify(title, {
        trim: true,
        lower: true,
        replacement: '-',
      });
      await this.postEntity.update(
        { id: post.id },
        { title, slug, content, tags },
      );
    } else {
      await this.postEntity.update({ id: post.id }, { content, tags });
    }

    return res.status(200).send({
      message: 'Post updated',
    });
  }

  async remove(req: Request, res: Response, id: string): Promise<any> {
    const { user }: any = req;
    const { userId }: any = user;
    const post = await this.postEntity.findOne({ where: { id, userId } });

    if (!post)
      return res.status(HttpStatus.NOT_FOUND).send({
        message: 'Post not found',
      });

    await this.postEntity.delete({ id: post.id });

    return res.status(200).send({
      message: 'Post Deleted',
    });
  }
}
