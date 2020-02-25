import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put} from '@nestjs/common';
import {CustomerService as CustomerService} from '../service/customer.service';
import Customer from "../model/entity/customer.entity";
import CustomerDTO from "../model/dto/customer.dto";

@Controller("customer")
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {
    }

    @Get()
    @HttpCode(200)
    async getAll(): Promise<Customer[]> {
        return this.customerService.getAll();
    }

    @Get(":id")
    @HttpCode(200)
    async get(@Param("id") id: string): Promise<Customer> {
        return this.customerService.get(id);
    }

    @Post()
    @HttpCode(204)
    async create(@Body() dto: CustomerDTO) {
        await this.customerService.create(dto);
    }

    @Put(":id")
    @HttpCode(201)
    async update(@Param("id") id: string, @Body() dto: CustomerDTO): Promise<void> {
        await this.customerService.update(id, dto);
    }

    @Delete(":id")
    @HttpCode(204)
    async delete(@Param("id") id: string): Promise<void> {
        await this.customerService.delete(id);
    }
}
