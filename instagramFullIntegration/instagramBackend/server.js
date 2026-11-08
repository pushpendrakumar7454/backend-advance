import app from "./src/app.js"
import config from "./src/config/config.js"
import connectDb from "./src/config/db.js"


const port = config.PORT

await connectDb()

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})