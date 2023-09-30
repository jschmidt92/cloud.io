import RssRepository from './rssRepository'

class RssService {
  private rssRepository: RssRepository

  constructor() {
    this.rssRepository = new RssRepository()
  }

  async createRssItem(data: any): Promise<any> {
    return await this.rssRepository.create(data)
  }

  async getRssItems(): Promise<any[]> {
    return await this.rssRepository.findAll()
  }

  async getRssItemById(id: string): Promise<any | null> {
    return await this.rssRepository.findById(id)
  }

  async updateRssItem(id: string, data: any): Promise<any> {
    return await this.rssRepository.update(id, data)
  }

  async deleteRssItem(id: string): Promise<any> {
    return await this.rssRepository.delete(id)
  }

  async getLatestRssItem(): Promise<any | null> {
    return await this.rssRepository.findLatest()
  }
}

export default RssService
