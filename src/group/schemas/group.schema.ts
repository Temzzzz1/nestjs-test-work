import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'

export const GroupSchema = new mongoose.Schema({
    id: { type: Number, required: true},
    name: { type: String, required: true},
    users: [{ type: String, ref: 'User'}]
})