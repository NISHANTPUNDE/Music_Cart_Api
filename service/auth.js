const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const expireTime = 7*24*60*60*1000; // ek din
function setUser(user){
    return jwt.sign(
        {
            _id:user._id,
            email:user.email,
            name:user.name
        }
        ,process.env.SECRET,{
            expiresIn: expireTime
        });
}

function getUser(token)
{
    if(!token) return null;
    try {
        return jwt.verify(token,process.env.SECRET)  
    } catch (error) {
        return null;
    }
    
}


module.exports = {setUser,getUser}