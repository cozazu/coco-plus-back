import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUsersDto } from './users.dto';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { Role } from 'src/models/roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(data: CreateUsersDto) {
    const user = await this.getUserByEmail(data.email);
    if (user) throw new BadRequestException('Usuario existente');

    const newUserTemp = this.usersRepository.create(data);
    const newUser = await this.usersRepository.save(newUserTemp);

    return newUser;
  }

  async findAll() {
    const user = await this.usersRepository.find();
    return user;
  }

  async getUserByEmail(email: string): Promise<Users> {
    const user = await this.usersRepository.findOneBy({ email });
    return user;
  }

  async findOne(id: UUID) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['coworkings', 'employee', 'employee.company'],
    });

    if (!user) throw new BadRequestException('User not found');
    return user;
  }

  /*   update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  } */

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async preloadSuperAdminUser() {
    const hashedPassword = await bcrypt.hash(
      process.env.SUPERADMIN_PASSWORD,
      10,
    );

    const adminUser = {
      name: process.env.SUPERADMIN_NAME,
      lastname: process.env.SUPERADMIN_LASTNAME,
      phone: process.env.SUPERADMIN_PHONE,
      email: process.env.SUPERADMIN_EMAIL,
      identification: process.env.SUPERADMIN_IDENTIFICATION,
      position: process.env.SUPERADMIN_POSITION,
      password: hashedPassword,
      role: Role.SUPERADMIN,
    };

    const userTemp = await this.usersRepository.findOne({
      where: { email: adminUser.email },
    });

    if (!userTemp) {
      console.log('Admin user has been created...');
      return await this.usersRepository.save(adminUser);
    }
    console.log('Admin user already exists...');
  }
}