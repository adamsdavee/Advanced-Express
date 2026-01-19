class ApiError extends Error {
   constructor(message, statusCode) {
      super(message)
      this.status = statusCode
      this.name = "ApiError"
   }
}

// fn(req, res, next) is a normal middleware

// Basically a function that returns another function
const asyncHandler = (fn) => (err, req, res, next) => {
   Promise.resolve(fn(req, res, next)).catch(next)
}

// This is an error handling middleware
const globalErrorHandler = (err, req, res, next) => {
   console.error(err.stack)

   if (err instanceof ApiError) {
      return res.status(err.status).json({
         status: "Error",
         message: err.message,
      })
   } else if (err.name === "ValidationError") {
      // Trying to handle other errors like mongoose errors
      return res.status(400).json({
         status: "error",
         message: "Validation Error",
      })
   } else {
      return res.status(500).json({
         status: "error",
         message: "An unexpected error occured",
      })
   }
}

module.exports = { ApiError, asyncHandler, globalErrorHandler }
