import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { PaginationMetadata } from 'src/shared/entities/pagination-metadata.entity';

@ObjectType()
export class UsersResponse {
  @Field(() => [User])
  data: User[];

  @Field(() => PaginationMetadata)
  metadata: PaginationMetadata;
}
