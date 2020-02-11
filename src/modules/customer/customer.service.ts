import RedisProvider from "src/configs/redis.provider";
import { injectable, inject } from "inversify";
import Customer from "./customer.entity";

@injectable()
export default class CustomerService {
    constructor(
        @inject(RedisProvider)
        private readonly redisProvider : RedisProvider,
    ){}

    async createUser(customer : Customer) : Promise<Customer> {
        const a = customer.username
        this.redisProvider.connection.set(customer.username);
    }
}