import * as mongoose from 'mongoose'
import { Schema } from 'mongoose'

export const GroupSchema = new mongoose.Schema({
    id: { type: String, required: true},
    name: { type: String, required: true},
    members: [{ type: String, ref: 'User'}]
})