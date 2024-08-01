import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';

@Injectable()
export class UsersService {
  // constructor(
  //   @Inject('User')
  //   private userEntity: Repository<User>,
  // ) {}

  async create(res: Response, createUserDto: CreateUserDto) {
    // console.log({ createUserDto });
    // this.userEntity.create({
    //   email: createUserDto.email,
    //   fullname: createUserDto.fullname,
    // });

    return res.status(201).send({ message: 'User created' });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
