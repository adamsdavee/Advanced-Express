const rateLimit = require("express-rate-limit")

const createBasicRateLimiter = (maxRequests, time) => {
   return rateLimit({
      max: maxRequests,
      windowMs: time,
      message: "Too many requests. Please try again later",
      standardHeaders: true,
      legacyHeaders: false,
   })
}

module.exports = { createBasicRateLimiter }
