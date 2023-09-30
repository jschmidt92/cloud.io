import axios from 'axios'
import BlogRepository from './blogRepository'

class BlogService {
  private blogRepository: BlogRepository

  constructor() {
    this.blogRepository = new BlogRepository()
  }

  async createBlog(data: any): Promise<any> {
    const authorId = data.author.id
    const authorDetails = await this.fetchAuthorDetails(authorId)
    if (!authorDetails) {
      throw new Error('Failed to fetch author details')
    }
    data.author = authorDetails
    return await this.blogRepository.create(data)
  }

  async getAllBlogs(): Promise<any[]> {
    return await this.blogRepository.findAll()
  }

  async getBlogById(id: string): Promise<any | null> {
    return await this.blogRepository.findById(id)
  }

  async updateBlog(id: string, data: any): Promise<any> {
    return await this.blogRepository.update(id, data)
  }

  async deleteBlog(id: string): Promise<any> {
    return await this.blogRepository.delete(id)
  }

  async fetchAuthorDetails(id: string): Promise<any> {
    const url = `http://135.135.196.140/users/${id}`

    try {
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      console.error('Error fetching author details:', error)
      throw error
    }
  }
}

export default BlogService
