const jwt = require('jsonwebtoken');

exports.validateUser = (req, res, next) => {
    try{
        const token = req.headers['access-token'];
    if(!token){
        return res.status(400).json({message: "JWT is required"})
    }
    jwt.verify(token, req.app.get('secretKey'),(err, decoded) =>{
        if(err){
            console.log(err);
            return res.status(400).json({message:"Invalid JWT token"});
        }

        // console.log(decoded);

        req.body.userId = decoded._id;
    });
    next();
    }catch(err){
        return res.status(500).json({message: "Internal server error"})
    }
}