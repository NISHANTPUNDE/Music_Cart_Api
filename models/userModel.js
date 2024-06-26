const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    name: { type: String,required: true },
    mobile: { type: Number, unique: true , required: true, dropDups: true, validate: {
        validator: function(v) {
            return /\d{10}/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      },
    },
    email: { type: String, unique: true,required: true},
    password: { type: String, required: true }
});


userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
})


userSchema.statics.login = async function(emailandnumber,password){
    const user=await this.findOne( {$or: [{ email: emailandnumber }, { phoneNumber: emailandnumber }]});  
    // console.log("user",user)
    if(user){
        // const salt = await bcrypt.genSalt();
        // console.log("password",bcrypt.hash(user.password,salt))
        // console.log(password,user.password)
        const auth=await bcrypt.compare(password,user.password);
        // console.log("auth",auth)    
        if(auth){
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}


module.exports = mongoose.model('User', userSchema,'user');