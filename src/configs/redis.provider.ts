import IConfig from './config.interface'
import Redis from 'ioredis'
import { injectable } from 'inversify'

@injectable()
export default class RedisProvider {
    public connection: Redis.Redis

    constructor() {
        this.init();
    }

    async init() {
        this.connection = await new Redis({
            port: 6379, // Redis port
            host: '192.168.99.100', // Redis host
            family: 4, // 4 (IPv4) or 6 (IPv6)
            // password: 'auth',
            db: 0,
            retryStrategy: function(times) {
                var delay = Math.min(times * 50, 2000)
                return delay
            },
        })
    }
}
