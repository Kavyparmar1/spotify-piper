import mongoose from "mongoose";
import _config from "../config/config.js";

async function connectDb() {
    try {
        await mongoose.connect(_config.MONGO_URI)
        console.log("connect to dbauth");
        
    } catch (error) {
        console.log('database errore',error);
        
    }
}
export default connectDb