const jwt= require("jsonwebtoken")


async function authJwt(req,res,next){
  const token= await req.headers.token
  if(token){
  const success=  jwt.verify(token,process.env.SECERT_KEY,(err,original)=>{
    if(err){
      res.status(401).json({"message":"unAuthorized"})
    }else{
      console.log("auth passed")
      req.user=original
      next()
    }
  })
 }else{
    res.status(400).json({message:"no token"})
 }
}
module.exports={
    authJwt
}