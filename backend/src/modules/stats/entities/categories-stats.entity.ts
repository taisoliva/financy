import { ObjectType, Field } from '@nestjs/graphql';
import { Category } from '../../categories/entities/category.entity';

@ObjectType()
export class CategoriesStats {
  @Field(() => Number)
  totalCategories: number;

  @Field(() => Number)
  totalTransactions: number;

  @Field(() => Category, { nullable: true })
  mostUsedCategory?: Category;
}
