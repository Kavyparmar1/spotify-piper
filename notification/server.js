import app from './src/app.js'
import sendEmail from './src/utils/email.js'
import {connect} from './src/broker/rabbit.js'
import startListener from './src/broker/listner.js'

connect().then(() => startListener());

app.listen(3000,()=>{
    console.log('port is running on 3000');
    
})