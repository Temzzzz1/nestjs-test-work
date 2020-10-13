import { Document } from 'mongoose'
import { IUser } from 'src/user/interfaces/user.interface';

export interface IGroup extends Document {
    readonly name: string,
    readonly id: number,
    readonly users: Array<String>
}