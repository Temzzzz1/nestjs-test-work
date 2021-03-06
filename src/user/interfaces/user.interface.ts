
import { Document } from 'mongoose'
import { IGroup } from 'src/group/interfaces/group.interface';

export interface IUser extends Document {
    readonly id: number,
    readonly name: string,
    readonly friends?: Array<string>,
    readonly groups: Array<String>
}