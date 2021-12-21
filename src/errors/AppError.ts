

export class AppError {
  public readonly message: string;
  public readonly statusCode: number;

  //se n for informado o numero do erro, vai ser 400
  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}
