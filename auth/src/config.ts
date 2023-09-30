import { config as dotEnvConfig } from 'dotenv'
import bunyan, { LogLevelString } from 'bunyan'
import pjs from '../package.json'

const { name, version } = pjs

const NODE_ENV = process.env.NODE_ENV || 'development'
dotEnvConfig({ path: `./.env.${NODE_ENV}` })

const DB_URL = process.env.MONGODB_URI || ''
const FRONTEND = process.env.FRONTEND || ''
const PORT = process.env.PORT || '3001'

const getLogger = (
  serviceName: string,
  serviceVersion: string,
  level: LogLevelString
) => bunyan.createLogger({ name: `${serviceName}:${serviceVersion}`, level })

interface ConfigOptions {
  name: string
  version: string
  serviceTimeout: number
  log: () => bunyan
}

const config: Record<string, ConfigOptions> = {
  development: {
    name,
    version,
    serviceTimeout: 30,
    log: () => getLogger(name, version, 'debug')
  },
  production: {
    name,
    version,
    serviceTimeout: 30,
    log: () => getLogger(name, version, 'info')
  },
  test: {
    name,
    version,
    serviceTimeout: 30,
    log: () => getLogger(name, version, 'fatal')
  }
}

export { DB_URL, FRONTEND, NODE_ENV, PORT }
export default config
