import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IGroup } from 'src/group/interfaces/group.interface';
import { CreateUserInput } from './dto/create-user.input';

import { IUser } from './interfaces/user.interface';


@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<IUser>,
        @InjectModel('Group') private readonly groupModel: Model<IGroup>,
    ) { }

    async create(createUserInput: CreateUserInput): Promise<IUser> {
        const createdUser = new this.userModel(createUserInput)
        return await createdUser.save()
    }

    async findAll(): Promise<IUser[]> {
        return await this.userModel.find().exec()
    }

    async delete(id: string): Promise<IUser> {
        return await (await this.userModel.findOne({ id })).deleteOne()
    }

    // only for test, there are incorrect params (need auth)
    async addFriend(fromId: string, toId: string): Promise<IUser> {
        const fromUser = await this.userModel.findOne({ id: fromId }).exec()
        const toUser = await this.userModel.findOne({ id: toId }).exec()

        if (fromUser && toUser) {
            fromUser.friends.push(toId)
            return fromUser.save()
        } else {
            throw new Error(`User not found`)
        }
    }

    async subscribeToGroup(userId: string, groupId: string) {
        const user = await this.userModel.findOne({ id: userId }).exec()
        const group = await this.groupModel.findOne({ id: groupId }).exec()

        if (user && group) {
            user.groups.push(groupId)
            group.members.push(userId)

            group.save()
            return user.save()
        } else {
            throw new Error(`User or group not found`)
        }
    }

}
