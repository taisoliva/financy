import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType({
  description: 'User entity',
})
export class User {
  @Field(() => String, { description: 'User ID' })
  id: string;

  @Field(() => String, { description: 'User full name' })
  fullName: string;

  @Field(() => String, { description: 'User email' })
  email: string;

  password: string;
}
