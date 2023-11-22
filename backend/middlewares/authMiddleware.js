const jwt = require('jsonwebtoken');
module.exports.authMiddleware = async(req, res, next)=>{
        const { accessToken } = req.cookies
        if(!accessToken){
                  return res.status(409).json({error:'Please login first'})
        }else{
            try {
                const decodedToken = await jwt.verify(accessToken,process.env.SECRET);
                req.id = decodedToken.id
                req.role = decodedToken.role
                next();
            } catch (error) {
                return res.status(409).json({error:'Please login'}) 
            }
        }
}
