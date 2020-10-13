import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { IUser } from 'src/user/interfaces/user.interface';
import { User } from 'src/user/models/user.model';
import { UserService } from 'src/user/user.service';
import { CreateGroupInput } from './dto/create-group.input';
import { GroupService } from './group.service';
import { IGroup } from './interfaces/group.interface';
import { Group } from './models/group.model';

@Resolver()
export class GroupResolver {
    constructor(private readonly groupService: GroupService) { }

    @Query(returns => [Group])
    groups(): Promise<IGroup[]> {
        return this.groupService.findAll();
    }

    @Mutation(returns => Group)
    async createGroup(
        @Args('createGroupData') createGroupData: CreateGroupInput,
    ): Promise<IGroup> {
        return await this.groupService.create(createGroupData);
    }

    @Mutation(returns => Group)
    async deleteGroup(
        @Args('id') id: string,
    ): Promise<IGroup> {
        return await this.groupService.delete(id);
    }

    @Mutation(returns => Group)
    async addUser(
        @Args('groupId') groupId: string,
        @Args('userId') userId: string,
    ): Promise<IGroup> {
        return await this.groupService.addUser(groupId, userId);
    }
}
