import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class PaginationMetadata {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  items: number;

  @Field()
  hasPrev: boolean;

  @Field(() => Int)
  totalPages: number;

  @Field()
  hasNext: boolean;
}
