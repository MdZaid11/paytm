const express=require('express');
const router=express.Router();
const app=express();
const jwt=require("jsonwebtoken")
app.use(express.json());
const {User,Account}=require('../db')
const {authMiddleware}=require('../middleware')
const z =require('zod');
const  JWT_SECRET  = require('../config');
const validateSchema=z.object({
    userName:z.string().email(),
    firstName:z.string(),
    lastName:z.string(),
    password:z.string(),
})
router.post('/signup',async(req,res)=>{
    console.log('Signup route accessed');
    const {success}= validateSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"Email already taken/ Incorrect inputs"
        })
    }
    try{
     const isAvailable=await User.findOne({userName:req.body.userName});
     if(isAvailable){
        return res.status(411).json({
            message:"Email already taken / Incorrect inputs"
        })
     }
     const user = await User.create({
        userName: req.body.userName,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
     })
     const userId=user._id;
     await Account.create({
        userId,
        balance: 1 + Math.random()*10000
     }) 
     const token=jwt.sign({
        userId
     },JWT_SECRET);
   await  User.updateOne({ _id: userId }, { $set: { token: token } })
     res.json({
        message: "User created successfully",
        token: token
    })
    }catch(error){
        console.log(`Error occur during signup please try again : ${error}`) 
    }

})
const signinBody = z.object({
    userName: z.string().email(),
	password: z.string()
})
router.post('/signin',async(req,res)=>{
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const {userName,password}= req.body;
    const isSignedUser= await User.findOne({userName,password});
    if(!isSignedUser){
        return res.status(411).json({
            message:"Error while logging in pls try again"
        })
    }
    const token=jwt.sign({userId:isSignedUser._id},JWT_SECRET);
    return res.status(200).json({
           token:token
    })
})



const updateSchema =z.object({
    password:z.string().optional(),
    firstName:z.string().optional(),
    lastName:z.string().optional(),
})
router.put('/',authMiddleware,async (req,res)=>{
   const {success}= updateSchema.safeParse(req.body);
   if(!success){
       return res.status(411).json({
           message:"Error while updating information",
       })
   }
  await User.updateOne({_id:req.userId},req.body);
  res.json({
   message: "Updated successfully", 
})
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})
module.exports=router;