import axios from 'axios'
import http from 'http'
import { AddressInfo } from 'net'
import config, { NODE_ENV, PORT } from './config'
import createService from './service'
import pjs from '../package.json'

const { name, version } = pjs

const currentConfig = config[NODE_ENV || 'development']
const service = createService(currentConfig)
const server = http.createServer(service)

server.listen(PORT)

server.on('listening', () => {
  const registerService = () =>
    axios.put(
      `http://discovery:3000/register/${name}/${version}/${
        (server.address() as AddressInfo).port
      }`
    )
  const unregisterService = () =>
    axios.delete(
      `http://discovery:3000/unregister/${name}/${version}/${
        (server.address() as AddressInfo).port
      }`
    )
  registerService()

  const interval = setInterval(registerService, 30 * 1000)
  const cleanup = async () => {
    clearInterval(interval)
    await unregisterService()
  }

  process.on('uncaughtException', async () => {
    await cleanup()
    process.exit(0)
  })

  process.on('SIGINT', async () => {
    await cleanup()
    process.exit(0)
  })

  process.on('SIGTERM', async () => {
    await cleanup()
    process.exit(0)
  })

  const log = currentConfig.log()
  log.info(
    `Character Micro-Service is Listening on Port ${
      (server.address() as AddressInfo).port
    } in ${service.get('env')} mode.`
  )
})
