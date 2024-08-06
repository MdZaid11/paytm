const  mongoose =require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/paytm")
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30,
    },
    firstName:{
       type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    password:{
        type:Number,
        minLength:[6,"password should be minimum of 8 length"]
    },
    token:{
        type:String,
    }
})
const accountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    balance:{
      type:Number,
      required:true
    }

})
const Account=mongoose.model('Account',accountSchema);
const User=mongoose.model('User',userSchema);

module.exports={
    User,
    Account,
}