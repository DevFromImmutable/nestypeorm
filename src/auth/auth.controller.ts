import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthDto } from './dto/auth.dto';
import { Public } from 'src/utils';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiTags('AUTH')
  @Public()
  @Post('login')
  login(@Res() res: Response, @Body() authDto: AuthDto) {
    return this.authService.signIn(res, authDto);
  }
}
