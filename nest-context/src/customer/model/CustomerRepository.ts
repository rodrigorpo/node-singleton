import {Connection, EntityRepository, Repository} from "typeorm";
import Customer from "./entity/customer.entity";

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
}

export const CustomerRepositoryProvider = {
    provide: 'CustomerRepository',
    useFactory: (connection: Connection) => connection.getCustomRepository(CustomerRepository),
    inject: [Connection]
};