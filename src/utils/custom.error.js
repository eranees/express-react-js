export class CustomError {
  constructor(message, status, error) {
    this.message = message;
    this.status = status,
      this.error = error;
  }
}