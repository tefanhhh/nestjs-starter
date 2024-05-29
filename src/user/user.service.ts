import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as helpers from '../helpers';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const body: CreateUserDto = {
      ...createUserDto,
      password: await helpers.hash(createUserDto.password),
    };
    return this.userRepository.save(body);
  }

  findAll(
    options: IPaginationOptions,
    _query: any = {},
  ): Promise<Pagination<User>> {
    const query: FindManyOptions<User> = {
      select: {
        userId: true,
        username: true,
        password: _query.withPassword,
      },
      where: {},
    };
    return paginate<User>(this.userRepository, options, query);
  }

  findOne(id: number, _query: any = {}): Promise<User> {
    return this.userRepository.findOne({
      where: {
        userId: id,
      },
      select: {
        userId: true,
        username: true,
        password: _query.withPassword,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const body: UpdateUserDto = {
      ...updateUserDto,
    };
    if (updateUserDto.password) {
      body.password = await helpers.hash(updateUserDto.password);
    }
    return this.userRepository.save({
      id,
      ...body,
    });
  }

  findOneByUsername(username: string, showPassword = false): Promise<User> {
    return this.userRepository.findOne({
      where: {
        username: username,
      },
      select: {
        userId: true,
        username: true,
        password: showPassword,
      },
    });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
