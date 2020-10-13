import { IGroup } from "src/group/interfaces/group.interface"
import { IUser } from "src/user/interfaces/user.interface"

export class EditGroupDto {
    readonly name?: string
    readonly id?: number
    readonly users?: Array<String>
}
