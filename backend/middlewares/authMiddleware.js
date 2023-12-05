const jwt = require('jsonwebtoken');
module.exports.authMiddleware = async(req, res, next)=>{
         const {authorization} = req.headers
    if(authorization){
        const token = authorization.split(' ')[1]
        // const { accessToken } = req.cookies
        if(!token){
            return res.status(409).json({error:'Please login first'})
        }else{
            try {
                const decodedToken = await jwt.verify(token,process.env.SECRET);
                req.id = decodedToken.id
                req.role = decodedToken.role
                next();
            } catch (error) {
                return res.status(409).json({error:'Please login'}) 
            }
        }
    }else{
        return res.status(409).json({error:'Please login'})  
    }
}
