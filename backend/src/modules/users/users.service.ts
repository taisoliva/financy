import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/database/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from 'generated/prisma/client';
import { PaginationArgs } from 'src/shared/args/pagination.args';

@Injectable()
export class UsersService {

  constructor(private readonly prisma: PrismaService){}
  async create(createUserInput: CreateUserInput) {
    const existsUser = await this.prisma.user.findFirst({
      where: {
        email: createUserInput.email,
      },
    });


    if (existsUser) {
      throw new Error('User already exists');
    }

    const password = await bcrypt.hash(createUserInput.password, 10);

    return await this.prisma.user.create({
      data: {
        fullName: createUserInput.fullName,
        email: createUserInput.email,
        password: password,
      },
    });
  }

  async findAll(paginationArgs: PaginationArgs) {

    const { skip, take } = paginationArgs;

    const where: Prisma.UserWhereInput = {}

    const data = await this.prisma.user.findMany({
      where,
      skip,
      take,
    });

    const total = await this.prisma.user.count({
      where,
    });

    return { data, metadata: {
      page: paginationArgs.skip,
				limit: paginationArgs.take,
				items: total,
				hasPrev: paginationArgs.skip > 0,
				totalPages: Math.ceil(total / paginationArgs.take),
				hasNext: skip * take < total,
    } };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const existsUser = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!existsUser) {
      throw new Error('User not found');
    }

    return await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        fullName: updateUserInput.fullName,
        email: updateUserInput.email,
      },
    });
  }

  async remove(id: string) {
    const existsUser = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!existsUser) {
      throw new Error('User not found');
    }

    return await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
