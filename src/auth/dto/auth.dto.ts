import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ required: true, type: String })
  email: string;

  @ApiProperty({ required: true, type: String })
  password: string;
}
