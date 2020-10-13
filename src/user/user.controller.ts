import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Query, Req, Res } from '@nestjs/common';
import { create } from 'domain';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    // MONGODB

    @Post('create')
    async createUser(@Query() params) {
        console.log(params)
        return this.userService.create({
            id: params.id,
            name: params.name,
            groups: params.groups,
            friends: params.groups
        })
    }

    @Post('find')
    async findAll() {
        return this.userService.findAll()
    }

    @Post('update')
    async update(@Query() params) {
        return this.userService.update(params.id, {
            name: params.name,
            groups: params.groups,
        })
    }

    @Delete('delete')
    async dalete(@Query() params) {
        return this.userService.delete(params.id)
    }

    @Post('add')
    async addFriend(@Query() params) {
        return this.userService.addFriend(params.fromId, params.toId)
    }

    @Post('subscribe')
    async subscribeToGroup(@Query() params) {
        return this.userService.subscribeToGroup(params.userId, params.groupId)
    }

    // POSTGRES

    @Post('createPG')
    async createPG(@Query() params ) {
        return this.userService.createUser(params.name)
    }

    @Post('findPG')
    async findUsers(@Query() params) {
        return this.userService.findUsers()
    }

    @Post('addfriend')
    async addFriendPG(@Query() params) {
        return this.userService.addFriendPG(params.userId, params.friendId)
    }

    @Post('showfriends')
    async showFriends(@Query() params) {
        return this.userService.showFriends(params.userId)
    }

    @Post('showGroups')
    async showGroups(@Query() params) {
        return this.userService.showGroups(params.userId)
    }
    
    
}
