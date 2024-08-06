const express=require('express');
const router=express.Router();
const {Account}=require('../db')
const {authMiddleware}=require('../middleware');
const { default: mongoose } = require('mongoose');

router.get('/balance',authMiddleware,async(req,res)=>{
    console.log("balance route accesses");
    const user=await Account.findOne({userId:req.userId});
    console.log(user);
    if(user){
        return res.status(200).json({
            balance:user.balance,
        })
    }
     return res.json({
        message:"User not found"
     })
})
router.post('/transfer',authMiddleware,async(req,res)=>{
    const {amount,to}=req.body;
    const account=Account.findOne({userId:req.userId});
    if(!account || account.balance<amount){
      
        return res.status(400).json({
            message:"Insufficient balance",
        })
    }
    const toAccount=await Account.findOne({userId:to});
    if (!toAccount) {
      
        return res.status(400).json({
            message: "Invalid account"
        });
    }
    await Account.updateOne({userId:req.userId},{
        $inc:{balance:-amount}
    })
    await Account.updateOne({userId:to},{
        $inc:{balance:amount}
    })

    
    res.json({
        message:"Transfer Successfull"
    })
})
module.exports=router;