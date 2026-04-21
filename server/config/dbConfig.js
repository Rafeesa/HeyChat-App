const mongoose=require('mongoose')


//connection logic
mongoose.connect(process.env.MONGODB_URI)

//connection state
const db=mongoose.connection;

db.on('connected',()=>{
    console.log("db connected")
})

db.on("err",()=>{
    console.log('db connection failed')
})

module.exports=db;