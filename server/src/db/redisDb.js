import ioredis from "ioredis";

const redis = new ioredis({
  host: process.env.REDIS_HOST ,
    port: process.env.REDIS_PORT ,
    username:"default",
    password: process.env.REDIS_PASSWORD ,
});
redis.on("connect", () => {
  console.log("Connected to Redis successfully");
});
redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

export default redis;