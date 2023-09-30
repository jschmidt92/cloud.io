import mongoose from 'mongoose'
import BlogSchema from './blogSchema'

const BlogModel = mongoose.model('blog', BlogSchema)

export default BlogModel
