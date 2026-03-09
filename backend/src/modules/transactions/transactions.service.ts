import { Injectable } from '@nestjs/common';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Prisma, TransactionType, User } from 'generated/prisma/client';
import { TransactionArgs } from './dto/transaction.args';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async create(createTransactionInput: CreateTransactionInput, user: User) {
    return await this.prisma.transaction.create({
      data: {
        date: new Date(createTransactionInput.date),
        description: createTransactionInput.description,
        amount: createTransactionInput.amount,
        type: createTransactionInput.type as TransactionType,
        categoryId: createTransactionInput.categoryId,
        userId: user.id,
      },
      include: {
        category: true,
      },
    });
  }

  async findAll(args: TransactionArgs, user: User) {
    const { description, type, categoryId, startDate, endDate } = args;

    const where: Prisma.TransactionWhereInput = {
      userId: user.id,
    };

    if (description) {
      where.description = {
        contains: description,
        mode: 'insensitive',
      };
    }

    if (type) {
      where.type = type as TransactionType;
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    const isValidDate = (date: Date) => date instanceof Date && !isNaN(date.getTime());

    if (isValidDate(startDate) || isValidDate(endDate)) {
      where.date = {};
      if (isValidDate(startDate)) {
        where.date.gte = startDate;
      }
      if (isValidDate(endDate)) {
        where.date.lte = endDate;
      }
    }

    return await this.prisma.transaction.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }

  async findOne(id: string, user: User) {
    const transaction = await this.prisma.transaction.findFirst({
      where: {
        id,
        userId: user.id,
      },
      include: {
        category: true,
      },
    });

    if (!transaction) {
      throw new Error('Transaction not found');
    }

    return transaction;
  }

  async update(id: string, updateTransactionInput: UpdateTransactionInput, user: User) {
    const exists = await this.prisma.transaction.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!exists) {
      throw new Error('Transaction not found');
    }

    return await this.prisma.transaction.update({
      where: {
        id,
      },
      data: {
        date: updateTransactionInput.date
          ? new Date(updateTransactionInput.date)
          : undefined,
        description: updateTransactionInput.description,
        amount: updateTransactionInput.amount,
        type: updateTransactionInput.type as TransactionType,
        categoryId: updateTransactionInput.categoryId,
      },
      include: {
        category: true,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
