const wishlists=require('../models/wishListschema')
// add to wishlist
exports.addtowishlist=async(req,res)=>{
    // get product details from request
    // using destructuring
    const {id,title,price,image}=req.body

    // logic
    try{
       const item=await wishlists.findOne({id})  
       if(item){
        res.status(402).json("Item Already in Wishlist")
       }
       else{
        const newProducts=new wishlists({id,title,price,image})
        await newProducts.save()
        res.status(200).json('Item added to ur wishlist')
       }
    }
    catch(error){
        res.status(401).json(error)
    }

}
// get wishlist 
exports.getwishList= async (req,res)=>{
    try{
        const allproducts=await wishlists.find()
        res.status(200).json(allproducts)
    }
    catch(error){
        res.status(401).json(error)
    }
}
// remove wishlist
exports.removefromwishlist=async (req,res)=>{
    // get id from req
    const {id}=req.params
    // remove id from collection
    try{
        const removeItem=await wishlists.deleteOne({id})
        if(removeItem){
            // get all items after removing the particular item
            const allitem=await wishlists.find()
            res.status(200).json(allitem)
        }
        else{
            res.status(401).json('Item Not in ur  wishlist')
        }

        }
    
    catch(error){
        res.status(401).json(error)
    }
}