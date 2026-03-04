const { Ratelimit }=require("@upstash/ratelimit");
const { redis }=require("./redis");

const ratelimit=new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(100, "1 m"), 
  analytics: true
});

module.exports = ratelimit;