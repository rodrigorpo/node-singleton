import IConfig from '../interface/config.interface'
import { readFile } from 'fs'
import { promisify } from 'util'
import dotenv, { DotenvParseOutput } from 'dotenv'

const readFileS = promisify(readFile)

export default class ConfigProvider implements IConfig {
    private _properties: Map<string, any>
    private readonly DEFAULT_CONFIGS: string = 'default'

    constructor(private envConfigs: string = 'dev') {}

    async init(): Promise<void> {
        console.log(`Initializing ConfigProvider module`)
        const init = Date.now()
        const defaultEnv: dotenv.DotenvConfigOutput = await this.parse(this.DEFAULT_CONFIGS)
        const secondary: dotenv.DotenvConfigOutput = await this.parse(this.envConfigs)
        this._properties = new Map(Object.entries({ ...defaultEnv, ...secondary }))

        console.log(`Finalizing ConfigProvider module in ${Date.now() - init}ms`)
    }

    async parse(param: string) {
        const config = await readFileS(`./src/environment/${param}.env`)
        return dotenv.parse(config)
    }

    get(name: string): string {
        return this._properties.get(name)
    }

    getNumber(name: string): number {
        return Number(this._properties.get(name))
    }

    getBoolean(name: string): boolean {
        return Boolean(this._properties.get(name))
    }
}
