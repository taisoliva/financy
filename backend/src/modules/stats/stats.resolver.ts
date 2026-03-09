import { Resolver, Query } from '@nestjs/graphql';
import { StatsService } from './stats.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/guards/gqlAuth.guard';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { User } from 'generated/prisma/client';
import { DashboardStats } from './entities/dashboard-stats.entity';
import { CategoriesStats } from './entities/categories-stats.entity';

@Resolver()
export class StatsResolver {
  constructor(private readonly statsService: StatsService) {}

  @Query(() => DashboardStats, { name: 'dashboardStats' })
  @UseGuards(GqlAuthGuard)
  async getDashboardStats(@CurrentUser() user: User) {
    return this.statsService.dashboardStats(user);
  }

  @Query(() => CategoriesStats, { name: 'categoriesStats' })
  @UseGuards(GqlAuthGuard)
  async getCategoriesStats(@CurrentUser() user: User) {
    return this.statsService.categoriesStats(user);
  }
}
