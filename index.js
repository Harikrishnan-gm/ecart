// automatically load env file to our app
require('dotenv').config()

// import express
const express= require('express')

// import router
const router=require('./routes/router')
// create server app
const server=express()

// import cors  
const cors=require('cors')

// import connection
require('./db/connection')

// to store port number
const PORT=3000

// use in server app
server.use(cors())
server.use(express.json())
server.use(router)

// to test route localhost3000
server.get('/',(req,res)=>{
    res.status(200).json(('Ecart server started'))
})

// run app
server.listen(PORT,()=>{
    console.log(`Server started at PORT ${PORT}`);
})

