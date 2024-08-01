import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/utils';

@ApiTags('USERS')
@ApiBearerAuth()
@ApiSecurity('JWT_AUTH')
@ApiHeader({
  name: 'Authorization',
  description: 'Pass Bearer Token',
  example: 'Bearer your_token',
  required: true,
})
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('register')
  async create(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(res, createUserDto);
  }

  @ApiSecurity('JWT_AUTH')
  @Get()
  findAll(@Res() res: Response) {
    return this.usersService.findAll(res);
  }

  @ApiSecurity('JWT_AUTH')
  @Get(':id')
  findOne(@Res() res: Response, @Param('id') id: string) {
    return this.usersService.findOne(res, id);
  }

  @ApiSecurity('JWT_AUTH')
  @Patch(':id')
  update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(res, id, updateUserDto);
  }

  @ApiSecurity('JWT_AUTH')
  @Delete(':id')
  remove(@Res() res: Response, @Param('id') id: string) {
    return this.usersService.remove(res, id);
  }
}
