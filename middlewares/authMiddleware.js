const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const customMiddleware =(req,res,next)=>{
  const token = req.header('auth-token');
if(!token){
  return res.status(401).json({
    msg:'authorization denied'
  })
} 
try{
  const decoded = jwt.verify(token,process.env.JWT_SECRET);
  req.user = decoded.id;
  next();
}
catch(err){
  res.status(401).json({
    msg:'token is not valid'
  })
} 
}

module.exports = {customMiddleware};
