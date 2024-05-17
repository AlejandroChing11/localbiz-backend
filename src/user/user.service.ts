import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

import * as bycrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly DataSource: DataSource

  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bycrypt.hashSync(password, 10)
      });

      await this.userRepository.save(user);
      delete user.password;
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    if (!this.userRepository.findOneBy({ id })) {
      throw new NotFoundException(`User with ${id} not found`)
    }

    const user = await this.userRepository.findOneBy({ id });
    delete user.password;
    return user;

  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    const user = await this.userRepository.preload({
      id,
      ...updateUserDto
    })

    if (!user) {
      throw new NotFoundException(`User with ${id} not found`);
    }

    try {
      await this.userRepository.save(user);
    } catch (err) {
      throw new Error(err.message);
    }

    return `The User with id: ${id} has been updated successfully`;

  }

  async remove(id: string) {
    const removeUser = await this.userRepository.delete(id);
    if (removeUser.affected === 0) {
      throw new NotFoundException(`User with ${id} not found`)
    }
    return `The User with id: ${id} has been deleted successfully`;
  }

  async findOneById(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ${id} not found`)
    }
    return user;
  }

}
