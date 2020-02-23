import IConfig from '../interface/config.interface'
import Express from 'express'
import ConfigProvider from './config.provider'

export default class ServerProvider implements IConfig {
    private app = Express()

    constructor(private configProvider: ConfigProvider) {}

    async init() {
        console.log(`Initializing ServerProvider module`)
        const init = Date.now()
        await this.app.listen(this.configProvider.get('SERVER_PORT'), () => {
            console.log(`Finalizing ServerProvider module in ${Date.now() - init}ms`)
            console.log(`Server started at port ${this.configProvider.get('SERVER_PORT')}`)
        })
    }
}
