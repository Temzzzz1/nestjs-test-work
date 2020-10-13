import { IGroup } from "src/group/interfaces/group.interface"
import { IUser } from "../interfaces/user.interface"

export class EditUserDto {
    readonly name?: string
    readonly friends?: Array<string>
    readonly groups?: Array<String>
}