const express = require("express")
const { configureCors } = require("./config/corsConfig")
const { requestLogger, addTimeStamp } = require("./middleware/customMiddleware")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000

// Connect to DB
// connectToMongoDB()

// Express middlewares
app.use(requestLogger)
app.use(addTimeStamp)

app.use(configureCors())
app.use(express.json())

// app.use("/api/products", productRouter)
// app.use("/reference", bookRouter)

app.get("/", (req, res) => {
   res.send("It is working!")
})

app.listen(PORT, () => {
   console.log(`Server listening at http://localhost:${PORT}`)
})
