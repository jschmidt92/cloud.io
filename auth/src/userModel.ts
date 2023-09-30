import mongoose from 'mongoose'
import UserSchema from './userSchema'

const UserModel = mongoose.model('user', UserSchema)

export default UserModel
