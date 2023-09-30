import axios from 'axios'
import ServiceHelper from './utils/helper'

const serviceHelperConfig = {
  serviceRegistryUrl: 'http://discovery:3000',
  serviceVersion: '0.0.1'
}
const serviceHelper = new ServiceHelper(serviceHelperConfig)

let characterServiceClient: any

// const refreshCharacterService = async () => {
//   let baseURL = '';
//   try {
//     const characterInfo = await serviceHelper.getServiceInfo("org.sog.hq.character");
//     baseURL = `http://${characterInfo.ip}:${characterInfo.port}`;
//   } catch (error) {
//     console.error('Error while getting service info:', error);
//     baseURL = "http://135.135.196.140/characters";
//   } finally {
//     try {
//       characterServiceClient = axios.create({ baseURL });
//       await characterServiceClient.get('/');
//     } catch (error) {
//       console.error('Error while connecting to the service:', error);
//     }
//   }
// };

// refreshCharacterService();
// setInterval(refreshCharacterService, 60 * 1000);

characterServiceClient = axios.create({
  baseURL: 'http://135.135.196.140/characters'
})

interface CharacterClient {
  getCharacter(uid: string, index?: number): Promise<any>
  getArmory(uid: string, index?: number): Promise<any>
  getGarage(uid: string, index?: number): Promise<any>
  getMessages(uid: string): Promise<any>
}

const CharacterService: CharacterClient = {
  async getCharacter(uid: string, index: number = 0) {
    const key = `${uid}_${index}`
    return await characterServiceClient.get(`/${key}`)
  },

  async getArmory(uid: string, index: number = 0) {
    const key = `${uid}_Armory_Unlocks_${index}`
    return await characterServiceClient.get(`/${key}/armory`)
  },

  async getGarage(uid: string, index: number = 0) {
    const key = `${uid}_Garage_Unlocks_${index}`
    return await characterServiceClient.get(`/${key}/garage`)
  },

  async getMessages(uid: string) {
    const pre_number = uid.slice(-6)
    const key = '0160' + pre_number
    return await characterServiceClient.get(`/${key}/messages`)
  }
}

export default CharacterService
