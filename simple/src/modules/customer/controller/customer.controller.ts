import CustomerService from '../service/customer.service'
import Customer from '../model/entity/customer.entity'
import CustomerDTO from '../model/dto/customer.dto'
import { Request, Response } from 'express'

export default class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    getAll = async (_: Request, res: Response) => {
        return res.status(200).json(await this.customerService.getAll())
    }

    get = async (req: Request, res: Response) => {
        return res.status(200).json(await this.customerService.get(req.params.id))
    }

    create = async ({ body: { name, username, password } }: Request, res: Response) => {
        const customer: CustomerDTO = { name, username, password }
        return res.status(201).json(await this.customerService.create(customer))
    }

    update = async ({ params: { id }, body: { name, username, password } }: Request, res: Response) => {
        const customer: CustomerDTO = { name, username, password }
        return res.status(204).json(await this.customerService.update(id, customer))
    }

    delete = async (req: Request, res: Response) => {
        return res.status(204).json(await this.customerService.delete(req.params.id))
    }
}
