import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userEntity: Repository<User>,
  ) {}

  async create(res: Response, createUserDto: CreateUserDto): Promise<any> {
    const { email, password, fullname } = createUserDto;

    if (!email || !password || !fullname)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'Invalid inputs' });

    const user = await this.userEntity.findOne({ where: { email } });

    if (user)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'User already exists' });

    const hashedPassword = await hash(password, 12);

    const result = await this.userEntity.save({
      email: email,
      password: hashedPassword,
      fullname: fullname,
    });

    if (!result)
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Some problem while registering user.' });

    return res.status(HttpStatus.CREATED).send({ message: 'User created' });
  }

  async findAll(res: Response): Promise<any> {
    const users = await this.userEntity.find();

    return res.status(200).send({
      message: 'All users list',
      users,
    });
  }

  async findOne(res: Response, id: string): Promise<any> {
    const user = await this.userEntity.findOne({ where: { id } });

    if (!user)
      return res.status(HttpStatus.NOT_FOUND).send({
        message: 'User not found',
      });

    return res.status(200).send({
      message: 'User with given ID',
      user,
    });
  }

  async update(
    res: Response,
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<any> {
    const { password, fullname } = updateUserDto;
    let user: any;

    if (password) {
      const hashedPassword = await hash(password, 12);
      user = await this.userEntity.update(
        { id },
        { password: hashedPassword, fullname },
      );
    } else {
      user = await this.userEntity.update({ id }, { fullname });
    }

    if (!user)
      return res.status(HttpStatus.NOT_FOUND).send({
        message: 'User not found',
      });

    return res.status(200).send({
      message: 'User info updated',
    });
  }

  async remove(res: Response, id: string): Promise<any> {
    const user = await this.userEntity.delete({ id });

    if (!user)
      return res.status(HttpStatus.NOT_FOUND).send({
        message: 'User not found',
      });

    return res.status(200).send({
      message: 'User Deleted',
    });
  }
}
