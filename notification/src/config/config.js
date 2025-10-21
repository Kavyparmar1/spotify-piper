import {config as configDotenv} from 'dotenv'
configDotenv()

const _config = {
    GOOGLE_CLIENT_ID : process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET : process.env.GOOGLE_CLIENT_SECRET,
    REFRESH_TOKEN : process.env.REFRESH_TOKEN,
    EMAIL_USER : process.env.EMAIL_USER,
    RABBITMQ_URI : process.env.RABBITMQ_URI
}

export default Object.freeze(_config)