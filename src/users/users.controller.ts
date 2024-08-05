import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { ApiHeader, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/utils';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('USERS')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(res, createUserDto);
  }

  @UseGuards(AuthGuard)
  @ApiSecurity('JWT_AUTH')
  @ApiHeader({
    name: 'Authorization',
    description: 'Pass Bearer Token',
    example: 'Bearer your_token',
    required: true,
  })
  @Get()
  findAll(@Req() req: Request, @Res() res: Response) {
    return this.usersService.findAll(req, res);
  }

  @ApiSecurity('JWT_AUTH')
  @ApiHeader({
    name: 'Authorization',
    description: 'Pass Bearer Token',
    example: 'Bearer your_token',
    required: true,
  })
  @UseGuards(AuthGuard)
  @Get('profile')
  findOne(@Req() req: Request, @Res() res: Response) {
    return this.usersService.findOne(req, res);
  }

  @ApiSecurity('JWT_AUTH')
  @ApiHeader({
    name: 'Authorization',
    description: 'Pass Bearer Token',
    example: 'Bearer your_token',
    required: true,
  })
  @UseGuards(AuthGuard)
  @Patch('update-profile')
  update(
    @Req() req: Request,
    @Res() res: Response,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(req, res, updateUserDto);
  }

  @ApiSecurity('JWT_AUTH')
  @UseGuards(AuthGuard)
  @Delete('delete-profile')
  remove(@Req() req: Request, @Res() res: Response) {
    return this.usersService.remove(req, res);
  }
}
