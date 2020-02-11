import CustomerService from "./customer.service";
import { injectable, inject } from "inversify";
import Customer from "./customer.entity";

@injectable()
export default class CustomerController {
    constructor(
        @inject(CustomerService)
        private readonly customerService : CustomerService,
    ){}

    async createUser(customer : Customer) : Promise<Customer> {
        return await this.customerService.createUser(customer)
    }
}