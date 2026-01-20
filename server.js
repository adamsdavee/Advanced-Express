const express = require("express")
const { configureCors } = require("./config/corsConfig")
const { requestLogger, addTimeStamp } = require("./middleware/customMiddleware")
const { urlVersioning } = require("./middleware/apiVersioning")
const { createBasicRateLimiter } = require("./middleware/rateLimiting")
const itemRouter = require("./route/item.route")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000

// Connect to DB
// connectToMongoDB()

// Express middlewares
app.use(requestLogger)
app.use(addTimeStamp)

app.use(configureCors())
app.use(createBasicRateLimiter(2, 15 * 60 * 1000)) // 100 requests per 15mins
app.use(express.json())

// app.use(urlVersioning("v1"))

app.use("/api/v1", itemRouter)

app.get("/", (req, res) => {
   res.send("It is working!")
})

app.listen(PORT, () => {
   console.log(`Server listening at http://localhost:${PORT}`)
})
