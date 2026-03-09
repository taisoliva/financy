import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { CategoryArgs } from './dto/category.args';
import { CategoriesResponse } from './dto/categories-response.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/guards/gqlAuth.guard';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { User } from 'generated/prisma/client';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation(() => Category)
  @UseGuards(GqlAuthGuard)
  createCategory(@Args('createCategoryInput') createCategoryInput: CreateCategoryInput, @CurrentUser() user: User) {
    return this.categoriesService.create(createCategoryInput, user);
  }

  @Query(() => CategoriesResponse, { name: 'categories' })
  @UseGuards(GqlAuthGuard)
  findAll(@Args() args: CategoryArgs, @CurrentUser() user: User) {
    return this.categoriesService.findAll(args, user);
  }

  @Query(() => Category, { name: 'category' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id', { type: () => String }) id: string, @CurrentUser() user: User) {
    return this.categoriesService.findOne(id, user);
  }

  @Mutation(() => Category)
  @UseGuards(GqlAuthGuard)
  updateCategory(@Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput, @CurrentUser() user: User) {
    return this.categoriesService.update( updateCategoryInput.id, updateCategoryInput, user);
  }

  @Mutation(() => Category)
  @UseGuards(GqlAuthGuard)
  removeCategory(@Args('id', { type: () => String }) id: string, @CurrentUser() user: User) {
    return this.categoriesService.remove(id, user);
  }
}
