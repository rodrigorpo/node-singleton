import IConfig from '../interface/config.interface'
import Redis from './node_modules/ioredis'
import { injectable } from './node_modules/inversify'

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
