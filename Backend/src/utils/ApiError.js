class ApiError extends Error {
  constructor(code, message = "Something went wrong", errors = [], stack = "") {

    super(message);
    
    this.code = code;
    this.errors = errors;
    this.success = false;
    // super(message);
    // this.code = code;
    // this.data = null;
    // this.errors = errors;
    // this.success = false;

    //optional code 
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError }