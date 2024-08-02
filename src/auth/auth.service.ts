import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userEntity: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(res: Response, authDto: AuthDto): Promise<any> {
    const { email, password } = authDto;

    if (!email || !password) {
      return res.status(400).send({ message: 'Email and password required' });
    }

    const user = await this.userEntity.findOne({ where: { email } });
    if (!user)
      return res.status(400).send({ message: 'Email of password invalid' });

    const isPasswordCorrect = compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(400).send({ message: 'Email of password invalid' });

    const payload = { userId: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return res.status(200).send({ message: 'User logged in.', token });
  }
}
