import { Document } from 'mongoose'

export interface IGroup extends Document {
    readonly name: string,
    readonly id: string,
    readonly members: Array<String>
}