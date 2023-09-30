import { Schema } from 'mongoose'

const RssSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: false },
  url: { type: String, required: true },
  guid: { type: String, required: false }
})

RssSchema.pre('save', function (this: any, next) {
  if (!this.guid) {
    this.guid = this._id.toString()
  }
  next()
})

export default RssSchema
