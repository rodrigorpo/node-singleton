import ConfigProvider from './providers/config.provider'
import RedisProvider from './providers/redis.provider'
import DatabaseProvider from './providers/database.provider'

import IConfig from './interface/config.interface'
import ServerProvider from './providers/server.provider'
import CustomerController from '../modules/customer/controller/customer.controller'
import CustomerService from '../modules/customer/service/customer.service'
import { Repository, getRepository } from 'typeorm'
import Customer from '../modules/customer/model/entity/customer.entity'

export default class ServerHandler implements IConfig {
    private readonly magenta = `\x1b[35m`
    private readonly reset = `\x1b[0m`

    private configProvider: ConfigProvider
    private redisProvider: RedisProvider
    private databaseProvider: DatabaseProvider
    private serverProvider: ServerProvider

    private customerController: CustomerController
    private customerService: CustomerService
    private customerRepository: Repository<Customer>

    async init(): Promise<void> {
        console.log(`${this.magenta}Initializing Server${this.reset}`)
        const init = Date.now()

        this.configProvider = new ConfigProvider(process.argv[2])
        await this.configProvider.init()
        this.redisProvider = new RedisProvider(this.configProvider)
        await this.redisProvider.init()
        this.databaseProvider = new DatabaseProvider(this.configProvider)
        await this.databaseProvider.init()

        const beans = Date.now()
        console.log(`${this.magenta}Initializing Beans${this.reset}`)

        this.customerRepository = getRepository(Customer)
        this.customerService =  new CustomerService(this.customerRepository)
        this.customerController = new CustomerController(this.customerService)

        console.log(`Finalizing DatabaseProvider module in ${Date.now() - beans}ms`)

        this.serverProvider = new ServerProvider(this.configProvider, this.customerController)
        await this.serverProvider.init()

        console.log(`${this.magenta}Server started in ${Date.now() - init}ms${this.reset}`)
    }
}
