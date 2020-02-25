import {NestFactory} from '@nestjs/core';
import {CustomerModule} from './customer/customer.module';

async function bootstrap() {
    const app = await NestFactory.create(CustomerModule);
    await app.listen(8080);
}

(async () => {
    await bootstrap();
})();
