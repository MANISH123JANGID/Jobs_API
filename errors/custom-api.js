class CustomAPIError extends Error {
  constructor(message) {
    // By calling the super() method in the constructor method, we call the parent's constructor method and gets access to the parent's properties and methods:
    super(message)
  }
}

module.exports = CustomAPIError
