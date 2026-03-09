import { ObjectType, Field } from '@nestjs/graphql';
import { Category } from '../entities/category.entity';
import { PaginationMetadata } from 'src/shared/entities/pagination-metadata.entity';

@ObjectType()
export class CategoriesResponse {
  @Field(() => [Category])
  data: Category[];

  @Field(() => PaginationMetadata)
  metadata: PaginationMetadata;
}
