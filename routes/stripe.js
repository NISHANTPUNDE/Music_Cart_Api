require('dotenv').config()
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)
const express=require('express')
const router=express.Router()
router.post('/create-checkout-session',async(req,res)=>{
    try{
        const session=await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            customer_email: req.body.useremail,
            metadata: {
                username: req.body.username,
            },
            
            line_items:req.body.cartitems.map(item=>({
                price_data:{
                    currency:'inr',
                    product_data:{
                        name:item.Title,
                        images:[item.imgSrc]
                    },
                    unit_amount:item.Selling_Price*100
                },
                quantity:item.quantity
            })),
            mode:'payment',
            success_url: `${process.env.REACT_APP_URL}/success`,
            cancel_url: `${process.env.REACT_APP_URL}/cancel`,
        })
        res.json({id:session.id})
    }catch(error){
        console.log('Error creating checkout session:',error)
        res.status(500).send('Error creating checkout session')
    }
})  
module.exports=router
