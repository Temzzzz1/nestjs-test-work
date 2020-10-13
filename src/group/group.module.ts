import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupService } from './group.service';
import { GroupSchema } from './schemas/group.schema';
import { GroupResolver } from './group.resolver';
import { UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Group', schema: GroupSchema}]),
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
  ],
  providers: [GroupService, GroupResolver],
})
export class GroupModule {}
