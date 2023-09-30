import http from 'http'
import { AddressInfo } from 'net'
import config, { NODE_ENV, PORT } from './config'
import createService from './service'

const currentConfig = config[NODE_ENV]
const service = createService(currentConfig)

const server = http.createServer(service)

server.listen(PORT)

server.on('listening', () => {
  const log = currentConfig.log()
  log.info(
    `Discovery Micro-Service is Listening on Port ${
      (server.address() as AddressInfo).port
    } in ${service.get('env')} mode.`
  )
})
