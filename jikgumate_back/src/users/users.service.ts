import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  async findOneByEmail(email: string): Promise<Users | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findOne(userId: number): Promise<Users | null> {
    return await this.usersRepository.findOne({ where: { userId } });
  }

  async updateHashedRefreshToken(
    userId: number,
    hashedRt: string | null,
  ): Promise<void> {
    await this.usersRepository.update(userId, { hashedRt });
  }
}
