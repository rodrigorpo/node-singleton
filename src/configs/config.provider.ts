import IConfig from './config.interface'
import RedisProvider from './redis.provider'

export default class ConfigProvider implements IConfig {
    constructor(private readonly redisProvider: RedisProvider) {}

    async init() {
        await RedisProvider.getInstance();
    }
}
