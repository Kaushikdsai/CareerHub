const { Ratelimit }=require("@upstash/ratelimit");
const { Redis }=require("@upstash/redis");
require("dotenv").config();

const ratelimit=new Ratelimit({
    redis: new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN
    }),
    limiter: Ratelimit.slidingWindow(10000, "900s")
});

module.exports = ratelimit;
