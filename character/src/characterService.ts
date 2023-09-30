import CharacterModel from './characterModel'
import CharacterRepository from './characterRepository'

class CharacterService {
  private characterRepository: CharacterRepository

  constructor() {
    this.characterRepository = new CharacterRepository()
  }

  async getCharacterByKey(key: string): Promise<CharacterModel | null> {
    return await this.characterRepository.findCharacterByKey(key)
  }

  async getArmoryByKey(key: string) {
    return await this.characterRepository.findArmoryByKey(key)
  }

  async getGarageByKey(key: string) {
    return await this.characterRepository.findGarageByKey(key)
  }

  async getMessagesByKey(key: string) {
    return await this.characterRepository.findMessagesByKey(key)
  }
}

export default CharacterService
