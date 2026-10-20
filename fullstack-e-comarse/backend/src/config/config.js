import dotenv from "dotenv";

dotenv.config();

export const config = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    ACCEESS_TOKEN: process.env.JWT_ACCESS_TOKEN,
    REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN,
    IMAGEKIT_PRIVATE_KEY:process.env.IMAGEKIT_PRIVATE_KEY,
    GOOGLE_CLIENT_ID:process.env.GOOGLE_CLINT_ID,
    GOOGLE_CLIENT_SECRET:process.env.GOOGLE_SECRET_ID,
    GOOGLE_CALLBACK_URL_:process.env.CALLBACK_URL
};