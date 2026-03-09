import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class DashboardStats {
  @Field(() => Int)
  balance: number;

  @Field(() => Int)
  incomeOfMonth: number;

  @Field(() => Int)
  expenseOfMonth: number;
}
