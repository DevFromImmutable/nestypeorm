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
        .status(HttpStatus.CONFLICT)
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

  async findAll(req: Request, res: Response): Promise<any> {
    const { user }: any = req;
    const { userId }: any = user;
    const currentUser = await this.userEntity.findOne({
      where: { id: userId },
    });

    if (currentUser.role !== 'ADMIN') {
      return res.status(HttpStatus.FORBIDDEN).send({
        message: 'You can not view all users',
      });
    }

    const users = await this.userEntity.find();

    return res.status(200).send({
      message: 'All users list',
      users,
    });
  }

  async findOne(req: Request, res: Response): Promise<any> {
    const { user }: any = req;
    const { userId }: any = user;

    const userProfile = await this.userEntity.findOne({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullname: true,
        role: true,
        created_at: true,
        updated_at: true,
        password: false,
      },
    });

    if (!userProfile)
      return res.status(HttpStatus.NOT_FOUND).send({
        message: 'User not found',
      });

    return res.status(200).send({
      message: 'User with given ID',
      user: userProfile,
    });
  }

  async update(
    req: Request,
    res: Response,
    updateUserDto: UpdateUserDto,
  ): Promise<any> {
    const { user }: any = req;
    const { userId }: any = user;
    const currentUser = await this.userEntity.findOne({
      where: { id: userId },
    });

    if (!currentUser)
      return res.status(HttpStatus.NOT_FOUND).send({
        message: 'User not found',
      });

    const { password, fullname } = updateUserDto;

    if (password) {
      const hashedPassword = await hash(password, 12);
      await this.userEntity.update(
        { id: userId },
        { password: hashedPassword, fullname },
      );
    } else {
      await this.userEntity.update({ id: userId }, { fullname });
    }

    return res.status(200).send({
      message: 'User profile updated',
    });
  }

  async remove(req: Request, res: Response): Promise<any> {
    const { user }: any = req;
    const { userId }: any = user;
    const currentUser = await this.userEntity.findOne({
      where: { id: userId },
    });

    if (!currentUser)
      return res.status(HttpStatus.NOT_FOUND).send({
        message: 'User not found',
      });

    await this.userEntity.delete({ id: userId });

    return res.status(200).send({
      message: 'User Deleted',
    });
  }
}
