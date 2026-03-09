import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTransactionInput {
  

  @Field(() => String)
  description: string;

  @Field(() => Date)
  date: Date;

  @Field(() => Number)
  amount: number;

  @Field(() => String)
  type: string;

  @Field(() =>  String)
  categoryId: string;
}
