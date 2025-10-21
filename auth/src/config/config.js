import { config as configDotenv  } from "dotenv";

configDotenv()

const _config = {
    MONGO_URI : process.env.MONGO_URI,
    JWT_KEY:process.env.JWT_KEY,
    GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET
}

export default _config