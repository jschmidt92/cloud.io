import BlogModel from './blogModel'

class BlogRepository {
  async create({
    title,
    date,
    author,
    image,
    summary,
    content,
    tags
  }: {
    title: string
    date: Date
    author: string
    image: string
    summary: string
    content: string
    tags: [string]
  }): Promise<any> {
    try {
      const blog = new BlogModel({
        title,
        date,
        author,
        image,
        summary,
        content,
        tags
      })
      return await blog.save()
    } catch (e) {
      throw e
    }
  }

  async findAll(): Promise<any> {
    try {
      return await BlogModel.find()
    } catch (e) {
      throw e
    }
  }

  async findById(_id: string): Promise<any> {
    try {
      const blog = await BlogModel.findOne({ _id })
      if (!blog) {
        throw new Error('Blog not found')
      }
      return blog
    } catch (e) {
      throw e
    }
  }

  async update(
    _id: string,
    data: {
      title?: string
      date?: Date
      author?: string
      image?: string
      summary?: string
      content?: string
      tags?: [string]
    }
  ): Promise<any> {
    try {
      const blog = await BlogModel.findOneAndUpdate({ _id }, data, {
        new: true
      })
      if (!blog) {
        throw new Error('Blog not found')
      }
      return blog
    } catch (e) {
      throw e
    }
  }

  async delete(_id: string): Promise<any> {
    try {
      const blog = await BlogModel.findOneAndDelete({ _id })
      if (!blog) {
        throw new Error('Blog not found')
      }
      return { message: 'Blog deleted successfully' }
    } catch (e) {
      throw e
    }
  }
}

export default BlogRepository
