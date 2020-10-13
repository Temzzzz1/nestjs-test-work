import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';

import { UserService } from './user.service';
import { GroupSchema } from 'src/group/schemas/group.schema';
import { UserResolver } from './user.resolver';




@Module({
  imports: [
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    MongooseModule.forFeature([{name: 'Group', schema: GroupSchema}]),
  ],
  providers: [UserService, UserResolver],
})
export class UserModule {}
