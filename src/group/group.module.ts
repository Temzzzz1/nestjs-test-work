import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { Group } from './schemas/group.entity';
import { Member } from './schemas/member.entity';
import { GroupSchema } from './schemas/group.schema';
import { User } from 'src/user/schemas/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Group', schema: GroupSchema}]),
    TypeOrmModule.forFeature([Group]),
    TypeOrmModule.forFeature([Member]),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
