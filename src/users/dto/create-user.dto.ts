import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  fullname: string;

  @ApiProperty({ type: String })
  password: string;
}
