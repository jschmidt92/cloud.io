import UserModel from './userModel'

class UserRepository {
  async create({ uid, name }: { uid: string; name: string }): Promise<any> {
    try {
      const user = new UserModel({
        uid,
        name
      })
      return await user.save()
    } catch (e) {
      throw e
    }
  }

  async findAll(): Promise<any> {
    try {
      return await UserModel.find()
    } catch (e) {
      throw e
    }
  }

  async findById(_id: string): Promise<any> {
    try {
      const user = await UserModel.findOne({ _id })
      if (!user) {
        throw new Error('User not found')
      }
      return user
    } catch (e) {
      throw e
    }
  }

  async update(
    _id: string,
    data: { uid?: string; name?: string }
  ): Promise<any> {
    try {
      const user = await UserModel.findOneAndUpdate({ _id }, data, {
        new: true
      })
      if (!user) {
        throw new Error('User not found')
      }
      return user
    } catch (e) {
      throw e
    }
  }

  async delete(_id: string): Promise<any> {
    try {
      const user = await UserModel.findOneAndDelete({ _id })
      if (!user) {
        throw new Error('User not found')
      }
      return { message: 'User deleted successfully' }
    } catch (e) {
      throw e
    }
  }
}

export default UserRepository
