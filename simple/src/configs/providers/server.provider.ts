import IConfig from '../interface/config.interface'
import Express, {Router} from 'express'
import ConfigProvider from './config.provider'
import CustomerController from 'src/modules/customer/controller/customer.controller'

export default class ServerProvider implements IConfig {
    private app = Express()

    constructor(private configProvider: ConfigProvider, private customerController: CustomerController) {}

    async init() {
        console.log(`Initializing ServerProvider module`)
        this.app.use(Express.json())
        this.appendRoutes()
        const init = Date.now()
        await this.app.listen(this.configProvider.get('SERVER_PORT'), () => {
            console.log(`Finalizing ServerProvider module in ${Date.now() - init}ms`)
            console.log(`Server started at port ${this.configProvider.get('SERVER_PORT')}`)
        })
    }

    appendRoutes() {
        const customerRouter = Router()

        customerRouter.get('/', this.customerController.getAll)
        customerRouter.get('/:id', this.customerController.get)
        customerRouter.post('/', this.customerController.create)
        customerRouter.put('/:id', this.customerController.update)
        customerRouter.delete('/:id', this.customerController.delete)

        this.app.use('/customer', customerRouter)
    }
}
