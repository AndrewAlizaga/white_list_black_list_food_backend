const mongoose = require('mongoose')
require('dotenv').config();

async function connectDB(){
    try {

        //Attempt connection
        mongoose.connect(process.env.CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }).then(e => {
            console.log('DB IS ONLINE')
        }).catch(e => {
            //Connection error
            console.log('db connection failed')
            console.log(e)
            
        }); 
    } catch (error) {
        console.log('unabled to connect to db')
        process.exit(1)
    }

}

module.exports  = connectDB;
