import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CategoryArgs } from './dto/category.args';
import { Prisma, User } from 'generated/prisma/client';

@Injectable()
export class CategoriesService {

  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryInput: CreateCategoryInput, user: User) {

    const existsCategory = await this.prisma.category.findFirst({
      where: {
        title: createCategoryInput.title,
        userId: user.id,
      },
    });

    if (existsCategory) {
      throw new Error('Category already exists');
    }

    return await this.prisma.category.create({
      data: {
        ...createCategoryInput,
        userId: user.id,
      },
    });
  }

  async findAll(args: CategoryArgs, user: User ) {

    const { skip, take } = args;

    const where: Prisma.CategoryWhereInput = {
      userId: user.id,
    }

    const data = await this.prisma.category.findMany({
      where,
      skip: (skip - 1) * take,
      take,
      include: {
        _count: {
          select: { transactions: true },
        },
      },
    });

    const total = await this.prisma.category.count({
      where,
    });

    const categoriesWithCount = data.map((category) => ({
      ...category,
      usageCount: category._count.transactions,
    }));

    return {
      data: categoriesWithCount,
      metadata: {
        page: args.skip,
        limit: args.take,
        items: total,
        hasPrev: args.skip > 0,
        totalPages: Math.ceil(total / args.take),
        hasNext: skip * take < total,
      },
    };
  }

  async findOne(id: string, user: User) {
    const category = await this.prisma.category.findFirst({
      where: {
        id: id,
        userId: user.id,
      },
    });

    if (!category) {
      throw new Error('Category not found');
    }

    return category;
  }

  async update(id: string, updateCategoryInput: UpdateCategoryInput, user: User) {
    const existsCategory = await this.prisma.category.findFirst({
      where: {
        id: id,
        userId: user.id,
      },
    });

    if (!existsCategory) {
      throw new Error('Category not found');
    }

    return await this.prisma.category.update({
      where: {
        id: id,
      },
      data: {
        title: updateCategoryInput.title,
        description: updateCategoryInput.description,
        color: updateCategoryInput.color,
        icon: updateCategoryInput.icon,
      },
    });
  }

  async remove(id: string, user: User) {
    const existsCategory = await this.prisma.category.findFirst({
      where: {
        id: id,
        userId: user.id,
      },
    });

    if (!existsCategory) {
      throw new Error('Category not found');
    }

    return await this.prisma.category.delete({
      where: {
        id: id,
      },
    });
  }
}
