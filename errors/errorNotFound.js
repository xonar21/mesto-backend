class ErrorNotFound extends Error {
  constructor(mesage) {
    super(mesage);
    this.errorMessage = { message: mesage };
    this.statusCode = 404;
  }
}

module.exports = ErrorNotFound;
