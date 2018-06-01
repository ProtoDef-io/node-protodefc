class ExtendableError extends Error {
  constructor (message) {
    super(message)
    this.name = this.constructor.name
    this.message = message
    Error.captureStackTrace(this, this.constructor.name)
  }
}

class PartialReadError extends ExtendableError {
  constructor (message) {
    super(message)
    this.partialReadError = true
  }
}

module.exports = {ExtendableError: ExtendableError, PartialReadError: PartialReadError}
