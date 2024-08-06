const JWT_SECRET = require('./config');
const jwt=require("jsonwebtoken");
console.log("inside")
const authMiddleware=(req,res,next)=>{
    console.log("inside authmiddleware");
    const authHeader=req.headers.authorization;
   console.log(authHeader)
    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({});
    }

    const token=authHeader.split(' ')[1];
    console.log(token);
    try{
        console.log("hi")
          const decoded= jwt.verify(token,JWT_SECRET);
          console.log("11111ss")
          if(decoded.userId){
            req.userId=decoded.userId;
            next();
          }else{
            return res.status(403).json({});
          }
    }catch(err){
        return res.status(403).json({});
    }
    
}
console.log("outside")
module.exports={authMiddleware};

