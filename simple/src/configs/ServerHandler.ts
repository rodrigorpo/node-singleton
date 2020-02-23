import ConfigProvider from './providers/config.provider'
import RedisProvider from './providers/redis.provider'
import DatabaseProvider from './providers/database.provider'

import IConfig from './interface/config.interface'
import ServerProvider from './providers/server.provider'

export default class ServerHandler implements IConfig {
    private readonly magenta = `\x1b[35m`
    private readonly reset = `\x1b[0m`

    private configProvider: ConfigProvider
    private redisProvider: RedisProvider
    private databaseProvider: DatabaseProvider
    private serverProvider: ServerProvider

    async init(): Promise<void> {
        console.log(`${this.magenta}Initializing Server${this.reset}`)
        const init = Date.now()

        this.configProvider = new ConfigProvider(process.argv[2])
        await this.configProvider.init()
        this.redisProvider = new RedisProvider(this.configProvider)
        await this.redisProvider.init()
        this.databaseProvider = new DatabaseProvider(this.configProvider)
        await this.databaseProvider.init()

        
        this.serverProvider = new ServerProvider(this.configProvider)
        await this.serverProvider.init()

        console.log(`${this.magenta}Server started in ${Date.now() - init}ms${this.reset}`)
    }
}
