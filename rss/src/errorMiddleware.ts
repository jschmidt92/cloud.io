import { NextFunction, Request, Response } from 'express'

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode: number

  if (err.message === 'Not Found') {
    statusCode = 404
  } else if (err.message === 'Server Error') {
    statusCode = 500
  } else {
    statusCode = res.statusCode ? res.statusCode : 200
  }

  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null
  })
}

export default errorMiddleware
