import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export class CreatePostDto {
  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  content: string;

  @ApiProperty({ type: [String], required: false })
  tags?: string[];

  @ApiProperty({ type: UUID })
  userId: string;
}
