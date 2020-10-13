import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {

  @Field()
  id: string;

  @Field()
  name: string;

  @Field(type => [String])
  friends: string[];

  @Field(type => [String])
  groups: string[];
}