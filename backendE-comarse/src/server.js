import app from "./app/app.js";
import { config } from "./config/config.js";
import connectDb from "./config/db.js";

const port = config.PORT;

await connectDb()

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});