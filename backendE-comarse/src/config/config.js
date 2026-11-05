import dotenv from 'dotenv'
dotenv.config()

export  const config={
    PORT:process.env.PORT,
    MONGO_URI:process.env.MONGO_URI,
    JWT_ACCESS_TOKEN:process.env.JWT_ACCESS_TOKEN,
    JWT_REFRESH_TOKEN:process.env.JWT_REFRESH_TOKEN
}