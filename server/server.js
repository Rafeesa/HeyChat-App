const server=require('./app')
const dotenv=require('dotenv')
dotenv.config({path:'./.env'})
const dbconfig=require('./config/dbConfig')



const port=process.env.PORT||3000


//this methode is ready for listening REQUEST
server.listen(port,()=>{
    console.log('Listening to request on PORT : ',port)
})