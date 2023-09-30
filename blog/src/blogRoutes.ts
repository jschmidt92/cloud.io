import express from 'express'
import {
  createBlog,
  deleteBlog,
  getBlogs,
  getBlogById,
  updateBlog
} from './blogController'

const router = express.Router()

router.get('/', getBlogs)
router.post('/', createBlog)
router.get('/:id', getBlogById)
router.patch('/:id', updateBlog)
router.delete('/:id', deleteBlog)

export default router
