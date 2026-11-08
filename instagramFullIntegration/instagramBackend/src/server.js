import app from "./app/app.js"
import config from "./app/config/config.js"
import connectDb from "./app/config/db.js"




const port =config.PORT

await connectDb()

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})