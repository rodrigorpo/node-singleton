import IConfig from '../interface/config.interface'
import { createConnection, Connection } from 'typeorm'
import e = require('express')
import ConfigProvider from './config.provider'

export default class DatabaseProvider implements IConfig {
    private connection: Connection

    constructor(private configProvider: ConfigProvider) {}

    async init(): Promise<void> {
        console.log(`Initializing DatabaseProvider module`)
        const init = Date.now()
        try {
            this.connection = await createConnection({
                type: 'postgres',
                host: this.configProvider.get("DB_HOST"),
                port: this.configProvider.getNumber("DB_PORT"),
                username: this.configProvider.get("DB_USER"),
                password: this.configProvider.get("DB_PASSWORD"),
                database: this.configProvider.get("DB_DATABASE"),
                schema: this.configProvider.get("DB_SCHEMA"),
                entities: [__dirname + './src/modules/**/*.entity.ts'],
                synchronize: this.configProvider.getBoolean("DB_SYNCHRONIZE"),
            })
        } catch (e) {
            throw e
        }
        this.connection.connect
        console.log(`Finalizing DatabaseProvider module in ${Date.now() - init}ms`)
    }
}
