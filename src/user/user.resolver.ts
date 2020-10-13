import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from './dto/create-user.input';
import { IUser } from './interfaces/user.interface';
import { User } from './models/user.model';
import { UserService } from './user.service';

@Resolver(of => User)
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    @Query(returns => [User])
    users(): Promise<IUser[]> {
      return this.userService.findAll();
    }

    @Mutation(returns => User)
    async createUser(
        @Args('createUserData') createUserData: CreateUserInput,
    ): Promise<IUser> {
        return await this.userService.create(createUserData);
    }

    @Mutation(returns => User)
    async deleteUser(
        @Args('id') id: string,
    ): Promise<IUser> {
        return await this.userService.delete(id);
    }

    @Mutation(returns => User)
    async addFriend(
        @Args('userId') userId: string,
        @Args('friendId') friendId: string,
    ): Promise<IUser> {
        return await this.userService.addFriend(userId, friendId);
    }

    @Mutation(returns => User)
    async subscribeToGroup(
        @Args('userId') userId: string,
        @Args('groupId') groupId: string,
    ): Promise<IUser> {
        return await this.userService.subscribeToGroup(userId, groupId);
    }
}
