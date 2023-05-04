
const express= require('express')

//using express create object for router class inorder to setup path
const router= new express.Router()
const productController= require('../controllers/productController')
// resolve client requests in various server routes

const wishlistsController=require("../controllers/wishListController")
const cartitems=require('../controllers/cartController')
// get all products api
router.get('/products/all-products',productController.getAllproducts)

// view product
router.get('/products/view-products/:id',productController.viewProduct)
// exports router

// post to wishlist
router.post('/wishlist/addproduct',wishlistsController.addtowishlist)
// get wishlists
router.get('/products/wish-list',wishlistsController.getwishList)
// remove item from wishlist
router.delete('/wishlist/removeitem/:id',wishlistsController.removefromwishlist)

// add to cart
router.post('/products/addtocart',cartitems.addtoCart) 

// get cart items
router.get('/products/cart',cartitems.getCart)

// remove from cart
router.delete('/products/cart/remove/:id',cartitems.removefromCart)

// empty cart
router.delete('/cart/removeItems',cartitems.emptyCart)

// update Quantity
router.get('/cart/increment/:id',cartitems.increment)
// update quantity -dec
router.get('/cart/decrement/:id',cartitems.decrement)
module.exports=router 