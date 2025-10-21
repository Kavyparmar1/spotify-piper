import app from './src/app.js';
import connectDb from './src/db/db.js';
import {connect} from './src/broker/rabbit.js'


connectDb()
connect()
app.listen(3000,()=>{    
    console.log("port is running on 3000");
})