import { Response } from 'express'
class SuccessResponse {
  public constructor(
    public statusCode: number,
    public message: string,
    public data?: object,
    public options?: object
  ) {}
  public send = (res: Response) => {
    res.status(this.statusCode).json({
      status: 'success',
      message: this.message,
      data: this.data,
      options: this.options
    })
  }
}

export default SuccessResponse
