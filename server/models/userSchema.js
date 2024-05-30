const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keySecret = "romaezakmihyoasehujdlbhsihbqlfhjkoijs"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Not a Valid Email")
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    cpassword:{
        type:String,
        required:true,
        minlength:6
    },
    tokens:[
        {
            token:{
                type:String,
                required: true,
            }
        }
    ]
});





// hash password 

userSchema.pre("save", async function(next){                             // pre() functions which are passed control during execution of asynchronous functions.

    if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next()                                                               //next() a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.
})        

//token genrate
userSchema.methods.generateAuthToken = async function(){
    try {
        let token10 = jwt.sign({_id:this._id},keySecret , {
            expiresIn:"1d"
        });

        this.tokens = this.tokens.concat({token:token10});
        await this.save();
        return token10;
    } catch (error) {
        res.status(442).json(error)
    }
}


// creating model
const userdb = new mongoose.model("users", userSchema);                  // you should put the password hashed before the creation of model to get hash password !!

module.exports = userdb;