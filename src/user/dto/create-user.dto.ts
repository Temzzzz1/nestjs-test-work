import { IGroup } from "src/group/interfaces/group.interface"
import { IUser } from "../interfaces/user.interface"

export class CreateUserDto {
    readonly id?: number
    readonly name: string
    readonly friends?: Array<string>
    readonly groups: Array<String>
}