import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/user/interfaces/user.interface';
import { CreateGroupInput } from './dto/create-group.input';
import { IGroup } from './interfaces/group.interface';


@Injectable()
export class GroupService {

    constructor(
        @InjectModel('Group') private readonly groupModel: Model<IGroup>,
        @InjectModel('User') private readonly userModel: Model<IUser>
    ) { }


    async create(createGroupData: CreateGroupInput): Promise<IGroup> {
        const createdGroup = new this.groupModel(createGroupData)
        return await createdGroup.save()
    }

    async findAll(): Promise<IGroup[]> {
        return await this.groupModel.find().exec()
    }

    async delete(id: string): Promise<IGroup> {
        return await (await this.groupModel.findOne({ id })).deleteOne()
    }

    async addUser(groupId: string, userId: string): Promise<IGroup> {
        const user = await this.userModel.findOne({ id: userId }).exec()
        const group = await this.groupModel.findOne({ id: groupId }).exec()

        if (user && group) {
            user.groups.push(groupId)
            group.members.push(userId)

            user.save()
            return group.save()
        } else {
            throw new Error(`User or group not found`)
        }
    }
}
