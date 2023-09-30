import mongoose from 'mongoose'
import RssSchema from './rssSchema'

export interface IRss extends Document {
  title: string
  description: string
  date: Date
  url: string
  guid: string
}

const RssModel = mongoose.model<IRss>('Rss', RssSchema)

export default RssModel
