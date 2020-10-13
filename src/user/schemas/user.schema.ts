import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'

export const UserSchema = new mongoose.Schema({
    id: { type: String, required: true},
    name: { type: String, required: true},
    groups: [{ type: String, ref: 'Group'}],
    friends: [{ type: String, ref: 'User'}]
})