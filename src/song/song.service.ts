import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Request, Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song)
    private songEntity: Repository<Song>,
  ) {}

  async create(res: Response, createSongDto: CreateSongDto): Promise<any> {
    const { title, duration, artists } = createSongDto;
    if (!title || !duration || !artists) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: 'Invalid input' });
    }

    await this.songEntity.save({ title, duration, artists });

    return res.status(HttpStatus.CREATED).send({ message: 'Song added' });
  }

  async findAll(res: Response): Promise<any> {
    const songs = await this.songEntity.find();

    return res.status(HttpStatus.OK).send({ message: 'Songs List', songs });
  }

  async findOne(res: Response, id: string): Promise<any> {
    const song = await this.songEntity.findOne({ where: { id } });
    if (!song)
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: 'Song not found with given ID' });

    return res.status(HttpStatus.OK).send({ message: 'Songs List', song });
  }

  update(id: number, updateSongDto: UpdateSongDto) {
    return `This action updates a #${id} song`;
  }

  remove(id: number) {
    return `This action removes a #${id} song`;
  }
}
