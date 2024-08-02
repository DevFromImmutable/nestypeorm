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
  findAll(@Res() res: Response) {
    return this.usersService.findAll(res);
  }

  @ApiSecurity('JWT_AUTH')
  @ApiHeader({
    name: 'Authorization',
    description: 'Pass Bearer Token',
    example: 'Bearer your_token',
    required: true,
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Res() res: Response, @Param('id') id: string) {
    return this.usersService.findOne(res, id);
  }

  @ApiSecurity('JWT_AUTH')
  @ApiHeader({
    name: 'Authorization',
    description: 'Pass Bearer Token',
    example: 'Bearer your_token',
    required: true,
  })
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(res, id, updateUserDto);
  }

  @ApiSecurity('JWT_AUTH')
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Res() res: Response, @Param('id') id: string) {
    return this.usersService.remove(res, id);
  }
}
