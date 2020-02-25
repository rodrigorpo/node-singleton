import {Module} from '@nestjs/common';
import {CustomerController} from './controller/customer.controller';
import {CustomerService} from './service/customer.service';
import Customer from "./model/entity/customer.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DatabaseModule} from "../config/database/database.module";

@Module({
    imports: [DatabaseModule, TypeOrmModule.forFeature([Customer])],
    controllers: [CustomerController],
    providers: [CustomerService],
})
export class CustomerModule {
}
