import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (error) => {
      console.log(`Redis client is not connected to server: ${error}`);
    });
  }

  // verify connection status of redis
  isAlive() {
    if (this.client.connected) {
      return true;
    }

    return false;
  }

  // get value function
  async get(key) {
    const redisGet = promisify(this.client.get).bind(this.client);
    const getValue = await redisGet(key);

    return getValue;
  }

  // set key, value function
  async set(key, value, duration) {
    const redisSet = promisify(this.client.set).bind(this.client);

    await redisSet(key, value);
    await this.client.expire(key, duration);
  }

  // del key, value function
  async del(key) {
    const redisDel = promisify(this.client.del).bind(this.client);

    await redisDel(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
