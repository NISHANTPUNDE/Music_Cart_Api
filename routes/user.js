const express=require('express')
const router=express.Router();
const {register,login}=require('../controllers/userController')
const {checkUser}=require('../middleware/auth')
router.post('/register',register)                                       
router.post('/login',login)
router.post('/',checkUser)

module.exports=router



