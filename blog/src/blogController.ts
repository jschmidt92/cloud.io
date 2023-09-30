import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import BlogService from './blogService'

const blogService = new BlogService()

const createBlog = asyncHandler(async (req: Request, res: Response) => {
  const row = await blogService.createBlog(req.body)

  try {
    res.status(201).json(row)
  } catch (e) {
    res.status(500)
    if (e instanceof Error) {
      throw new Error(e.message)
    } else {
      throw e
    }
  }
})

const getBlogs = asyncHandler(async (req: Request, res: Response) => {
  const rows = await blogService.getAllBlogs()

  try {
    res.json(rows)
  } catch (e) {
    res.status(500)
    if (e instanceof Error) {
      throw new Error(e.message)
    } else {
      throw e
    }
  }
})

const getBlogById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id
  const row = await blogService.getBlogById(id)

  try {
    if (row) {
      res.status(201).json(row)
    } else {
      res.status(404)
      throw new Error(`Cannot find blog with ID ${id}`)
    }
  } catch (e) {
    res.status(500)
    if (e instanceof Error) {
      throw new Error(e.message)
    } else {
      throw e
    }
  }
})

const updateBlog = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const { title, date, author, image, summary, content, tags } = req.body
  const row = await blogService.updateBlog(id, {
    title,
    date,
    author,
    image,
    summary,
    content,
    tags
  })

  try {
    res.json(row)
  } catch (e) {
    res.status(500)
    if (e instanceof Error) {
      throw new Error(e.message)
    } else {
      throw e
    }
  }
})

const deleteBlog = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id
  const row = await blogService.deleteBlog(id)

  try {
    if (row) {
      res.status(200).json(row)
    } else {
      res.status(404)
      throw new Error(`Cannot find blog with ID ${id}`)
    }
  } catch (e) {
    res.status(500)
    if (e instanceof Error) {
      throw new Error(e.message)
    } else {
      throw e
    }
  }
})

export { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog }
