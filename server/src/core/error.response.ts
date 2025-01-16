class ErrorResponse extends Error {
  constructor(
    public statusCode: number,
    public message: string
  ) {
    super(message)
    this.statusCode = statusCode
  }
}

export default ErrorResponse
