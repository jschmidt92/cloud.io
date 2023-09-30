import UserRepository from './userRepository'

class UserService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async createUser(data: any): Promise<any> {
    return await this.userRepository.create(data)
  }

  async getUsers(): Promise<any[]> {
    return await this.userRepository.findAll()
  }

  async getUserById(id: string): Promise<any | null> {
    return await this.userRepository.findById(id)
  }

  async updateUser(id: string, data: any): Promise<any> {
    return await this.userRepository.update(id, data)
  }

  async deleteUser(id: string): Promise<any> {
    return await this.userRepository.delete(id)
  }
}

export default UserService
