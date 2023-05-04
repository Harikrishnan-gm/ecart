// import from model
const cartitems=require('../models/cartSchema')

// addto cart
exports.addtoCart=async (req,res)=>{
    // get proiduct details from req by destructuring
    const{id,title,image,price,quantity}=req.body
    // logic
    try{
        // check product is in cart
        const product=await cartitems.findOne({id})
        if(product){
            // product is in cart
            // inc product quantity
            product.quantity+=1
            // update grand total
            product.grandTotal=product.price*product.quantity
            //changes save to mongodb
            product.save()
            // send res to client
            res.status(200).json("items added to ur cart")
        }
        else{
            // product is not in cart
            // add to cart
            const newProduct= new cartitems({id,title,image,price,quantity,grandTotal:price})
            await newProduct.save()
            // send res to client
            res.status(200).json("item added to cart")
        }
    }
    catch(error){
        res.status(401).json(error)
    }


}
exports.getCart= async (req,res)=>{
    try{
        const allitems= await cartitems.find()
        res.status(200).json(allitems)
    }
    catch(error){
        res.status(401).json(error)
    }
}
exports.removefromCart= async (req,res)=>{
    const {id}=req.params
    try{
        const removeitem=await cartitems.deleteOne({id})
        if(removeitem){
            const allitem=await cartitems.find()
            res.status(200).json(allitem)
        }
        else{
            res.status(401).json('Item not in your cart please refresh..!')
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}
exports.emptyCart=async (req,res)=>{
    try{
        const items= await cartitems.deleteMany({})
        res.status(200).json("Your Cart is empty now!!!")
    }
    catch(error){
        res.status(401).json(error)
    }
}
exports.increment=async (req,res)=>{
    const {id}=req.params
    try{
        //my code  const items=await cartitems.updateOne({id},{$inc:{quantity:1}})
        const product =await cartitems.findOne({id})
        if(product){
            // update quantity
            product.quantity+=1 
            product.grandTotal=product.price*product.quantity
            await product.save()

            // get all collections after update the item count
            const allitems=await cartitems.find()
            res.status(200).json(allitems)
        }
        else{
            res.status(404).json("Please refresh")
        }

    }
    catch(error){
        res.status(401).json(error)
    }
}
exports.decrement=async (req,res)=>{
    const {id}=req.params
    try{
        // check product is in cart collection
        const product=await cartitems.findOne({id})
        if(product){
            // update quantity
            product.quantity-=1
            if(product.quantity==0){
                // remove product from cart collections
                await cartitems.deleteOne({id})
                const allitems=await cartitems.find()
                res.status(200).json(allitems)
            }
            else{
                product.grandTotal=product.price*product.quantity
                await product.save()
    
                // get all collections after update the item count
                const allitems=await cartitems.find()
                res.status(200).json(allitems)
            }
        }
        else{
            res.status(404).json("Product not in cart")
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}