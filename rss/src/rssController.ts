import { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import Feed from 'rss'
import RssService from './rssService'

const rssService = new RssService()

const createRssItem = asyncHandler(async (req: Request, res: Response) => {
  const row = await rssService.createRssItem(req.body)

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

const getRssItems = asyncHandler(async (req: Request, res: Response) => {
  const feed = new Feed({
    title: 'SOG Rss Feed',
    description: 'A simple Rss feed for SOG',
    language: 'en',
    feed_url: '',
    site_url: ''
  })
  const rows = await rssService.getRssItems()
  rows.forEach((item) => {
    feed.item({
      title: item.title,
      description: item.description,
      url: item.url,
      date: item.date,
      guid: item.guid
    })
  })

  try {
    res.set('Content-Type', 'text/xml')
    res.send(feed.xml())
    // res.json(rows)
  } catch (e) {
    res.status(500)
    if (e instanceof Error) {
      throw new Error(e.message)
    } else {
      throw e
    }
  }
})

const getRssItemById = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id
  const row = await rssService.getRssItemById(id)

  try {
    if (row) {
      res.status(201).json(row)
    } else {
      res.status(404)
      throw new Error(`Cannot find rss with ID ${id}`)
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

const updateRssItem = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const { title, description, date, url } = req.body
  const row = await rssService.updateRssItem(id, {
    title,
    description,
    date,
    url
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

const deleteRssItem = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id
  const row = await rssService.deleteRssItem(id)

  try {
    if (row) {
      res.status(200).json(row)
    } else {
      res.status(404)
      throw new Error(`Cannot find rss with ID ${id}`)
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

const getLatesRssItem = asyncHandler(async (req: Request, res: Response) => {
  const row = await rssService.getLatestRssItem()

  try {
    if (row) {
      res.status(200).json(row)
    } else {
      res.status(404)
      throw new Error('Failed to fetch the latest RSS Item')
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

export {
  getRssItems,
  createRssItem,
  getRssItemById,
  updateRssItem,
  deleteRssItem,
  getLatesRssItem
}
