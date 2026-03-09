import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Category {
  @Field(() => String, { description: 'Category ID' })
  id: string;

  @Field(() => String, { description: 'Category title' })
  title: string;

  @Field(() => String, { description: 'Category description' })
  description: string;

  @Field(() => String, { description: 'Category color' })
  color: string;

  @Field(() => String, { description: 'Category icon' })
  icon: string;

  @Field(() => String)
  userId: string;

  @Field(() => Number, { defaultValue: 0 })
  usageCount: number;
}
