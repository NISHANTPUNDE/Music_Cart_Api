const User=require('../models/userModel');
const {setUser} = require("../service/auth");
module.exports.register = async (req, res, next) => {
    try{
        const user=new User(req.body);
        console.log(req.body);
        await user.save();
        if(user){
            const token=setUser(user)
            // console.log('User logged in:',token);
            
            res.cookie("uuid", token, {
            withCredentials:true,  
            httpOnly: false, 
            MaxAge: 7*24*60*60*1000,
        
            });
            console.log("sending cookie")
            
            res.status(201).send('User logged in');
        }
        else{
            res.status(404).send('error while signing in');
        }
    }catch(error){
        if(error.code===11000){
            res.status(400).send('User already exists');
        }
        else{
        console.log('Error registering user:',error);
        res.status(400).send('Error registering user');
        }
    }
}

module.exports.login = async (req, res, next) => {
    console.log(req.body);
    const{emailandnumber,password}=req.body;
    try{
        const user=await User.login(
            emailandnumber,
            password
        );
        if(user){
            const token=setUser(user)
            // console.log('User logged in:',token);
            
            res.cookie("uuid", token, {
                withCredentials:true,  
                httpOnly: false, 
                MaxAge: 7*24*60*60*1000,
            
                });
            // console.log("sending cookie")
            res.status(200).json({ name: user.name,email: user.email  });
            
        }
        else{
            res.status(404).send('User not found');
        }
    }catch(error){
        console.log('Error logging in:',error);
        res.status(400).send('Error logging in');
    }
}