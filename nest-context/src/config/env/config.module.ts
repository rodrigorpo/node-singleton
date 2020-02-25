import {Module} from '@nestjs/common';
import {ConfigProvider} from './config.provider';

@Module({
    providers: [ConfigProvider],
})
export class ConfigModule {
}
