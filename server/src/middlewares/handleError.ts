import { Request, Response, NextFunction } from 'express'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import ErrorResponse from '~/core/error.response'
const handleNotFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new ErrorResponse(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND)
  next(error)
}
const handleError = (err: ErrorResponse, req: Request, res: Response, next: NextFunction): void => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
  const errorMessage = err.message || ReasonPhrases.INTERNAL_SERVER_ERROR
  res.status(statusCode).json({
    status: 'error',
    statusCode: statusCode,
    message: errorMessage,
    stack: err.stack
  })
}

export { handleNotFound, handleError }
