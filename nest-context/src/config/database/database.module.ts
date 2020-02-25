import {Module} from '@nestjs/common';
import {TypeOrmModule, TypeOrmModuleOptions} from '@nestjs/typeorm';
import {Connection} from "typeorm";
import {ConfigProvider} from "../env/config.provider";

const configProvider = ConfigProvider.Instance;

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async (): Promise<TypeOrmModuleOptions> => (
                {
                    type: 'postgres',
                    host: await configProvider.get<string>("DB_HOST"),
                    port: await configProvider.get<number>("DB_PORT"),
                    username: await configProvider.get<string>("DB_USER"),
                    password: await configProvider.get<string>("DB_PASSWORD"),
                    database: await configProvider.get<string>("DB_DATABASE"),
                    schema: await configProvider.get<string>("DB_SCHEMA"),
                    entities: ['dist/**/*.entity.js'],
                    synchronize: await configProvider.get<boolean>("DB_SYNCHRONIZE"),
                }
            )
        })
    ]
})

export class DatabaseModule {
    constructor(private readonly connection: Connection) {
    }
}

