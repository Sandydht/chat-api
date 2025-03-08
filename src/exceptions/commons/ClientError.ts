class ClientError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);

    if (this.constructor.name === 'ClientError') {
      throw new Error('cannot instantiate abstract class');
    }

    this.name = 'ClientError';
    this.statusCode = statusCode;
  }
}

export default ClientError;
