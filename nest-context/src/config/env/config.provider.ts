import dotenv from 'dotenv'
import {readFile} from 'fs'
import {promisify} from 'util'

const readFileS = promisify(readFile);

export class ConfigProvider {
    private static _instance: ConfigProvider;
    private _properties: Map<string, any>;
    private readonly DEFAULT_CONFIGS: string = 'default';

    public static get Instance(): ConfigProvider {
        return this._instance || (this._instance = new this());
    }

    private async init(): Promise<void> {
        const defaultEnv: dotenv.DotenvConfigOutput = await this.parse(this.DEFAULT_CONFIGS);
        const secondary: dotenv.DotenvConfigOutput = await this.parse(process.argv[2]);
        this._properties = new Map(Object.entries({...defaultEnv, ...secondary}))
    }

    async parse(param = 'dev') {

        if (this.isPrd()) {
            return dotenv.parse(await readFileS(`./environment/${param}.env`));
        }
        const config = await readFileS(`./src/environment/${param}.env`);
        return dotenv.parse(config)
    }

    isPrd() {
        return process.argv[2] == 'prod';
    }

    public async get<T>(name: string): Promise<T> {
        if (!this._properties) {
            await this.init();
        }
        return this._properties.get(name);
    }
}