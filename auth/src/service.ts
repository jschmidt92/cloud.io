import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import connectToMongoDB from './mongoDB'
import userRoutes from './userRoutes'
import errorMiddleware from './errorMiddleware'

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
    service.use(cors())
    service.use(errorMiddleware)
    service.use(express.json())
    service.use('/', userRoutes)
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

    await connectToMongoDB()
  }

  StartServer()

  return service
}
