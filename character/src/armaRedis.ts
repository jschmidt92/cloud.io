import { Redis } from 'ioredis'
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from './config'

const redisClient: Redis = new Redis({
  host: REDIS_HOST,
  port: Number(REDIS_PORT),
  password: REDIS_PASSWORD
})

redisClient.on('error', (e: Error) => console.log('ArmaRedis Client Error', e))
redisClient.on('connect', () => console.log('ArmaRedis Client is connected!'))

export default redisClient
