import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import proxy from 'express-http-proxy'
import ServiceHelper from './utils/helper'

const service = express()

export default (config: any) => {
  const log = config.log()

  if (service.get('env') === 'development') {
    service.use((req: Request, res: Response, next: NextFunction) => {
      log.debug(`${req.method}: ${req.url}`)
      return next()
    })
  }

  const StartServer = async () => {
    const serviceHelperConfig = {
      serviceRegistryUrl: 'http://discovery:3000',
      serviceVersion: '0.0.1'
    }
    const serviceHelper = new ServiceHelper(serviceHelperConfig)

    service.use(cors())

    service.get('/', (req: Request, res: Response) => {
      res.json({ msg: 'Welcome to the Gateway' })
    })

    const refreshServiceInfo = async () => {
      serviceHelper
        .getServiceInfo('org.sog.hq.auth')
        .then((authInfo) => {
          serviceHelper
            .getServiceInfo('org.sog.hq.blog')
            .then((blogInfo) => {
              serviceHelper
                .getServiceInfo('org.sog.hq.character')
                .then((characterInfo) => {
                  serviceHelper
                    .getServiceInfo('org.sog.hq.rss')
                    .then((rssInfo) => {
                      service.use(
                        '/users',
                        proxy(`http://${authInfo.ip}:${authInfo.port}`)
                      )
                      service.use(
                        '/blog',
                        proxy(`http://${blogInfo.ip}:${blogInfo.port}`)
                      )
                      service.use(
                        '/characters',
                        proxy(
                          `http://${characterInfo.ip}:${characterInfo.port}`
                        )
                      )
                      service.use(
                        '/rss',
                        proxy(`http://${rssInfo.ip}:${rssInfo.port}`)
                      )
                    })
                    .catch((error) => {
                      log.error('Error setting up proxies:', error)
                    })
                })
                .catch((error) => {
                  log.error('Error setting up proxies:', error)
                })
            })
            .catch((error) => {
              log.error('Error setting up proxies:', error)
            })
        })
        .catch((error) => {
          log.error('Error setting up proxies:', error)
        })
    }

    // Initial fetch of service info
    await refreshServiceInfo()

    // Refresh service info every minute
    setInterval(refreshServiceInfo, 75 * 1000)

    service.use(
      (error: any, req: Request, res: Response, next: NextFunction) => {
        res.status(error.status || 500)
        log.error(error)
        return res.json({
          error: {
            message: error.message
          }
        })
      }
    )
  }

  StartServer()

  return service
}
