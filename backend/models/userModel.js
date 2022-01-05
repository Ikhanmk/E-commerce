const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter ur name"],
        maxlength:[30,"name cannot exceed 30 characters"],
        minlength:[4,"Name must have 4 or more characters"],
    },
    email:{
        type:String,
        required:[true,"Please enter ur email"],
        unique:true,
        validator:[validator.isEmail,"Please enter a valid email"],
    },
    password:{
        type:String,
        required:[true,"Please enter ur password"],
        minlength:[8, "password must be greater than 8 characters"],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        },
    },
    role:{
        type:String,
        default:"user",
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,

});

//password hashing
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,10);
});

//JWT token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    })
}

//compare password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    // Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  
    return resetToken;
  };

module.exports = mongoose.model("User",userSchema);