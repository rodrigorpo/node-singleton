import IConfig from '../interface/config.interface'
import Redis from 'ioredis'
import ConfigProvider from './config.provider'
import e from 'express'

export default class RedisProvider implements IConfig {
    public connection: Redis.Redis

    constructor(private configProvider: ConfigProvider) {}

    async init(): Promise<void> {
        console.log(`Initializing RedisProvider module`)
        const init = Date.now()

        try {
            this.connection = await new Redis({
                port: this.configProvider.getNumber('REDIS_PORT'),
                host: this.configProvider.get('REDIS_HOST'),
                family: 4,
                password: this.configProvider.get('REDIS_PASSWORD'),
                db: this.configProvider.getNumber('REDIS_DB'),
            })
        } catch (e) {
            throw e
        }

        console.log(`Finalizing RedisProvider module in ${Date.now() - init}ms`)
    }
}
