import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { User, TransactionType } from 'generated/prisma/client';

@Injectable()
export class StatsService {
  constructor(private readonly prisma: PrismaService) {}

  async dashboardStats(user: User) {
    const transactions = await this.prisma.transaction.findMany({
      where: { userId: user.id },
    });

    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const balance = transactions.reduce((acc, current) => {
      return current.type === TransactionType.INCOME
        ? acc + current.amount
        : acc - current.amount;
    }, 0);

    const incomeOfMonth = transactions
      .filter(
        (t) => t.type === TransactionType.INCOME && t.date >= firstDayOfMonth,
      )
      .reduce((acc, current) => acc + current.amount, 0);

    const expenseOfMonth = transactions
      .filter(
        (t) => t.type === TransactionType.EXPENSE && t.date >= firstDayOfMonth,
      )
      .reduce((acc, current) => acc + current.amount, 0);

    return {
      balance,
      incomeOfMonth,
      expenseOfMonth,
    };
  }

  async categoriesStats(user: User) {
    const transactions = await this.prisma.transaction.findMany({
      where: { userId: user.id },
      include: { category: true },
    });

    const totalTransactions = transactions.length;
    const totalCategories = await this.prisma.category.count({
      where: { userId: user.id },
    });

    // Find most used category
    const categoryCount: Record<string, { count: number; category: any }> = {};
    transactions.forEach((t) => {
      if (!categoryCount[t.categoryId]) {
        categoryCount[t.categoryId] = { count: 0, category: t.category };
      }
      categoryCount[t.categoryId].count++;
    });

    let mostUsedCategory = null;
    let maxCount = 0;

    for (const id in categoryCount) {
      if (categoryCount[id].count > maxCount) {
        maxCount = categoryCount[id].count;
        mostUsedCategory = categoryCount[id].category;
      }
    }

    return {
      totalCategories,
      totalTransactions,
      mostUsedCategory,
    };
  }
}
