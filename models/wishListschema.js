const mongoose= require('mongoose')

// define schema for products collection to store data

const wishListSchema=new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    title:{
        type:String,
        required:true,
        
    },
    price:{
        type:Number,
        required:true
    },
   
   
    image:{
        type:String,
        required:true
    },
    
    

})
//create model to store products

const wishlists = new mongoose.model("wishlists",wishListSchema)

// export the model

module.exports=wishlists 