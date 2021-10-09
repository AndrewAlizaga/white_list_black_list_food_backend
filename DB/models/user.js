//Libs
const mongoose = require("mongoose")
const {encrypt, compare} = require("../../utils/Encrypt");

//Base schema
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
}, {timestamps: true})


//Service

//Password match
userSchema.methods.passwordMatch = async function (enteredPassword) {
    return await compare(enteredPassword, this.password);;  
}

//Pre save, password encrypton
userSchema.pre('save', async function(next){

    if(!this.isModified('password')){
        next();
    }

    this.password = await encrypt(this.password);
    
});


const userModel = new mongoose.model('user', userSchema);




module.exports = userModel
