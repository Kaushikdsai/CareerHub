const ratelimit=require("../config/rateLimiter");

const rateLimitMiddleware=async (req, res, next) => {
    const identifier=req.ip;

    const { success }=await ratelimit.limit(identifier);
    if(!success){
        return res.status(429).json({
            message: "Too many requests. Try again later."
        });
    }
    next();
};

module.exports = rateLimitMiddleware;