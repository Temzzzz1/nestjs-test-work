import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { json } from 'express';
import { connect } from 'http2';
import { Model } from 'mongoose';
import { userInfo } from 'os';
import { IGroup } from 'src/group/interfaces/group.interface';
import { Member } from 'src/group/schemas/member.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { IUser } from './interfaces/user.interface';
import { Friend } from './schemas/friend.entity';
import { User } from './schemas/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<IUser>,
        @InjectModel('Group') private readonly groupModel: Model<IGroup>,
        @InjectRepository(User) private usersRepository: Repository<User>,
        @InjectRepository(Friend) private friendsRepository: Repository<Friend>,
        @InjectRepository(Member) private membersRepository: Repository<Member>
    ) { }


    // MONGODB
    async create(createUserDto: CreateUserDto): Promise<IUser> {
        const createdUser = new this.userModel(createUserDto)
        return await createdUser.save()
    }

    async findAll(): Promise<IUser[]> {
        return await this.userModel.find().exec()
    }

    async update(id: string, updatedUserDto: EditUserDto): Promise<IUser> {
        return await this.userModel.findOneAndUpdate({ id }, { $set: updatedUserDto }, (err) => {
            if (err) throw new Error(`User with id (${id}) not found`)
        })
    }

    async delete(id: string): Promise<IUser> {
        return await this.userModel.findOneAndDelete({ id }, (err) => {
            if (err) throw new Error(`User with id (${id}) not found`)
        })
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
            group.users.push(userId)

            group.save()
            return user.save()
        } else {
            throw new Error(`User or group not found`)
        }
    }

    // POSTGRES

    async createUser(name: string) {
        const user = new User()
        user.name = name
        return await this.usersRepository.save(user)
    }

    async findUsers() {
        return await this.usersRepository.find()
    }

    async addFriendPG(userId: number, friendId: number) {
        const friend1 = new Friend()
        const friend2 = new Friend()

        friend1.userId = userId
        friend1.friendId = friendId
        friend2.userId = friendId
        friend2.friendId = userId
        console.log(friend1, friend2)
        await this.friendsRepository.save(friend2)
        return await this.friendsRepository.save(friend1)
    }

    async showFriends(userId: number) {
        let friends = []
        let userFriends = await this.friendsRepository.find({ userId: userId})
        userFriends.forEach(value => {
            friends.push(value.friendId)
        })
        return friends
    }

    async showGroups(userId: number) {
        let groups = []
        let userGroups = await this.membersRepository.find({ userId: userId})
        userGroups.forEach(value => {
            groups.push(value.groupId)
        })
        return groups
    }
}
