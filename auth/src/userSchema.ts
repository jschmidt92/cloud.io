import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({
  uid: { type: String, required: true },
  name: { type: String, required: true }
})

export default UserSchema
