import RedisProvider from 'src/configs/providers/redis.provider'
import Customer from '../model/entity/customer.entity'
import { Repository } from 'typeorm'
import CustomerDTO from '../model/dto/customer.dto'

export default class CustomerService {
    constructor(private readonly customerRepository: Repository<Customer>) {}

    async getAll(): Promise<Customer[]> {
        return await this.customerRepository.find()
    }

    async get(id: string): Promise<Customer> {
        return await this.customerRepository.findOne(id)
    }

    async create(dto: CustomerDTO): Promise<{ id: string }> {
        const customer = new Customer(dto.username, dto.name, dto.password)
        customer.setStatus(Customer.Status.ACTIVE)

        const saved: Customer = await this.customerRepository.save(customer)
        return { id: saved.getId() }
    }

    async update(id: string, dto: CustomerDTO): Promise<void> {
        const customer = new Customer(dto.username, dto.name, dto.password)
        customer.setStatus(Customer.Status.ACTIVE)

        await this.customerRepository.update(id, customer)
    }

    async delete(id: string): Promise<void> {
        const customer: Customer = await this.customerRepository.findOne(id)
        customer.setStatus(Customer.Status.DELETED)
        await this.customerRepository.update(id, customer)
    }
}
