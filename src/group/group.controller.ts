import { Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {

    constructor(private readonly groupService: GroupService) {}

    @Post('create')
    async createUser(@Query() params) {
        console.log(params)
        return this.groupService.create({
            id: params.id,
            name: params.name,
            users: params.users,
        })
    }

    @Post('find')
    async findAll() {
        return this.groupService.findAll()
    }

    @Post('update')
    async update(@Query() params) {
        return this.groupService.update(params.id, {
            name: params.name,
            users: params.users,
        })
    }

    @Delete('delete')
    async dalete(@Query() params) {
        return this.groupService.delete(params.id)
    }

    // POSTGRES

    @Post('createPG')
    async createPG(@Query() params) {
        return this.groupService.createGroup(params.name)
    }
    
    @Post('findPG')
    async findPG(@Query() params) {
        return this.groupService.findGroups()
    }

    @Post('addmember')
    async addPG(@Query() params) {
        return this.groupService.addMemberToGroupPG(params.groupId, params.userId)
    }

    @Post('showmembers')
    async showMembersPG(@Query() params) {
        return this.groupService.showMembers(params.groupId)
    }

}
