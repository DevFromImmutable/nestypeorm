import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  content: string;

  @ApiProperty({ type: [String], required: false })
  tags?: string[];
}
