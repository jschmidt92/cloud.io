import RssModel from './rssModel'

class RssRepository {
  async findAll(): Promise<any> {
    try {
      return await RssModel.find()
    } catch (e) {
      throw e
    }
  }

  async create({
    title,
    description,
    date = new Date(),
    url
  }: {
    title: string
    description: string
    date: Date
    url: string
  }): Promise<any> {
    try {
      const rss = new RssModel({
        title,
        description,
        date,
        url
      })
      return await rss.save()
    } catch (e) {
      throw e
    }
  }

  async findById(id: string): Promise<any> {
    try {
      const rss = await RssModel.findById(id)
      if (!rss) {
        throw new Error('RSS not found')
      }
      return rss
    } catch (e) {
      throw e
    }
  }

  async update(
    _id: string,
    data: {
      title?: string
      description?: string
      date?: Date
      url?: string
    }
  ): Promise<any> {
    try {
      if (!data.date) {
        data.date = new Date()
      }
      const rss = await RssModel.findOneAndUpdate({ _id }, data, {
        new: true
      })
      if (!rss) {
        throw new Error('RSS not found')
      }
      return rss
    } catch (e) {
      throw e
    }
  }

  async delete(_id: string): Promise<any> {
    try {
      const rss = await RssModel.findOneAndDelete({ _id })
      if (!rss) {
        throw new Error('RSS not found')
      }
      return { message: 'RSS deleted successfully' }
    } catch (e) {
      throw e
    }
  }

  async findLatest(): Promise<any> {
    try {
      const latestItem = await RssModel.findOne().sort({ date: -1 }).exec();

      if (!latestItem) {
        return null;
      }

      return latestItem;
    } catch (e) {
      console.error("Failed to fetch the latest RSS Item:", e);
      throw e;
    }
  }
}

export default RssRepository
