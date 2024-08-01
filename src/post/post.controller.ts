import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Request, Response } from 'express';
import {
  ApiAcceptedResponse,
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('POST')
@ApiBearerAuth()
@ApiSecurity('JWT_AUTH')
@ApiHeader({
  name: 'Authorization',
  description: 'Pass Bearer Token',
  example: 'Bearer your_token',
  required: true,
})
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiOkResponse({ description: 'Post created' })
  create(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postService.create(req, res, createPostDto);
  }

  @Get()
  @ApiOkResponse({ description: 'All Post List' })
  findAll(@Res() res: Response) {
    return this.postService.findAll(res);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Post with given ID' })
  findOne(@Res() res: Response, @Param('id') id: string) {
    return this.postService.findOne(res, id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Your Post Updated' })
  update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.update(res, id, updatePostDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Your Post deleted' })
  remove(@Res() res: Response, @Param('id') id: string) {
    return this.postService.remove(res, id);
  }
}
