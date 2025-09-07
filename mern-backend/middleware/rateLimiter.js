const limiter=require("../config/upstash");

const rateLimiter=async (req,res,next) => {
    try{
        const {success}=await limiter.limit("my-limit-key");
        if(!success){
            return res.status(429).json({ message: "Too many requests, try later" });
        }
        next();
    }
    catch(err){
        console.error(err);
        next(err);
    }
};

module.exports=rateLimiter;
