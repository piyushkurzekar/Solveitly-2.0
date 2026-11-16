/** An error with an HTTP status that the error handler turns into a JSON response. */
export class ApiError extends Error {
  readonly statusCode: number;
  readonly errors?: Record<string, string[] | undefined>;

  constructor(statusCode: number, message: string, errors?: Record<string, string[] | undefined>) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.errors = errors;
  }

  static badRequest(message = "Bad request", errors?: Record<string, string[] | undefined>) {
    return new ApiError(400, message, errors);
  }
  static unauthorized(message = "Not authenticated") {
    return new ApiError(401, message);
  }
  static forbidden(message = "You do not have permission to do this") {
    return new ApiError(403, message);
  }
  static notFound(message = "Not found") {
    return new ApiError(404, message);
  }
  static conflict(message: string) {
    return new ApiError(409, message);
  }
}
