import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateGroupInput {
    @Field()
    id: String

    @Field()    
    name: string

}