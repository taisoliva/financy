import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Category } from '../../categories/entities/category.entity';

@ObjectType()
export class Transaction {
  @Field(() => String)
  id: string;

  @Field(() => String)
  description: string;

  @Field(() => Date)
  date: Date;

  @Field(() => Int)
  amount: number;

  @Field(() => String)
  type: string;

  @Field(() => String)
  categoryId: string;

  @Field(() => String)
  userId: string;

  @Field(() => Category, { nullable: true })
  category?: Category;
}
