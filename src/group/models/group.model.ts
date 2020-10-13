import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Group {

  @Field()
  id: string;

  @Field()
  name: string;

  @Field(type => [String])
  members: string[];

}