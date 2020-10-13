import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { EditGroupDto } from './dto/edit-group.dto';
import { Group } from './schemas/group.entity';
import { IGroup } from './interfaces/group.interface';
import { Member } from './schemas/member.entity';
import { User } from 'src/user/schemas/user.entity';

@Injectable()
export class GroupService {

    constructor(
        @InjectModel('Group') private readonly groupModel: Model<IGroup>,
        @InjectRepository(Group) private groupRepository: Repository<Group>,
        @InjectRepository(Member) private membersRepository: Repository<Member>,
        @InjectRepository(User) private usersRepository: Repository<User>,
        ) {}


    // MONGODB

    async create(createGroupDto: CreateGroupDto): Promise<IGroup> {
        const createdGroup = new this.groupModel(createGroupDto)
        return await createdGroup.save()
    }

    async findAll(): Promise<IGroup[]> {
        return await this.groupModel.find().exec()
    }

    async update(id: string, updatedGroupDto: EditGroupDto): Promise<IGroup> {
        return await this.groupModel.findOneAndUpdate({ id }, { $set: updatedGroupDto}, (err) => {
            if (err) throw new Error(`Group with id (${id}) not found`)
        })
    }

    async delete(id: string): Promise<IGroup> {
        return await this.groupModel.findOneAndDelete({ id }, (err) => {
            if (err) throw new Error(`User with id (${id}) not found`)
        })
    }

    // POSTGRES

    async createGroup(name: string) {
        const user = new Group()
        user.name = name
        return await this.groupRepository.save(user)
    }

    async findGroups() {
        return await this.groupRepository.find()
    }

    async addMemberToGroupPG(groupId: number, userId: number) {
        // Простите за неправильный нейминг
        const groupUser = new Member()
        const userGroup = this.usersRepository.find({ id: userId})

        if (userGroup) {
            groupUser.groupId = groupId
            groupUser.userId = userId
            return await this.membersRepository.save(groupUser)
        } 
        else return new Error('User not found')
        
    }

    async showMembers(groupId: number) {
        let members = []
        let group = await this.membersRepository.find({ groupId: groupId})
        group.forEach(value => {
            members.push(value.userId)
        })
        return members
    }
}
