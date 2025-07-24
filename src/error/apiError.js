export class apiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }

  static badRequest(msg) {
    return new apiError(400, msg);
  }

  static unauthorized(msg) {
    return new apiError(401, msg);
  }

  static notFound(msg) {
    return new apiError(404, msg);
  }
}