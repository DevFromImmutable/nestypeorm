import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty({ required: false, type: String, description: 'Post Title' })
  title?: string;

  @ApiProperty({ required: false, type: String, description: 'Post Content' })
  content?: string;

  @ApiProperty({ required: false, type: [String], description: 'Post Tags' })
  tags?: [string];
}
