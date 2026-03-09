import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field(() => String, { description: 'Category title' })
  title: string;

  @Field(() => String, { description: 'Category description' })
  description: string;

  @Field(() => String, { description: 'Category color' })
  color: string;

  @Field(() => String, { description: 'Category icon' })
  icon: string;
}
