const urlVersioning = (version) => {
   return function (req, res, next) {
      if (req.path.startsWith(`/api/${version}`)) {
         next()
      } else {
         res.status(404).json({
            success: false,
            message: "Api version not supported",
         })

         // If i did:
         // next(new Error('Api Version not supported'))
         // next(new ApiError("API version not supported", 404));
         //  throw new Error('Api Version not supported')

         // It basically goes straight to the next error handling middleware
      }
   }
}

const headerVersioning = (version) => (req, res, next) => {
   if (req.get("Accept-Version")) {
      next()
   } else {
      res.status(404).json({
         success: false,
         message: "Header version not supported",
      })
   }
}

const contentTypeVersioning = (version) => (req, res, next) => {
   const contentType = req.get("Content-Type")

   if (
      contentType &&
      contentType.includes(`application/vnd.api.${version}+json`)
   ) {
      next()
   } else {
      res.status(404).json({
         success: false,
         message: "Header version not supported",
      })
   }
}

module.exports = { urlVersioning, headerVersioning, contentTypeVersioning }
