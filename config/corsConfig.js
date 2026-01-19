const cors = require("cors")

const configureCors = () => {
   return cors({
      // origin -> tells which origin/IP you want to access your api
      origin: (origin, callback) => {
         const allowedOrigins = [
            "http://localhost:3000", // For my local dev
            "https://myCustomDomain.com", // For my production code
         ]

         if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true) // giving permission that the request can be allowed
         } else {
            callback(new Error("Not allowed by cors"))
         }
      },

      methods: ["GET", "POST", "PUT", "DELETE"], // Tells which method you want to allow user to use

      allowedHeaders: ["Content-Type", "Authorization", "Accept-Version"],

      exposedHeaders: ["X-Total-Count", "Content-Range"], // Headers to be exposed to the client
      credentials: true, // enable support for cookies and others
      preFlightContinue: false,
      maxAge: 600, // cache pre flight responses for 10mins(600s) which helps sending options requests multiple times
      optionsSuccessStatus: 204,
   })
}

module.exports = { configureCors }
