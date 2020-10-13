import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { GroupSchema } from 'src/group/schemas/group.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './schemas/user.entity';
import { Friend } from './schemas/friend.entity';
import { Member } from 'src/group/schemas/member.entity';


@Module({
  imports: [
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    MongooseModule.forFeature([{name: 'Group', schema: GroupSchema}]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Friend]),
    TypeOrmModule.forFeature([Member]),
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
