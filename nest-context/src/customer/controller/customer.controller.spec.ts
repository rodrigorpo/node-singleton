import {Test, TestingModule} from '@nestjs/testing';
import {CustomerController} from './customer.controller';
import {CustomerService} from '../service/customer.service';
import Customer from "../model/entity/customer.entity";
import {Status} from "../model/entity/Status";

describe('AppController', () => {
    let customerController: CustomerController;
    let customerService: CustomerService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [CustomerController],
            providers: [CustomerService],
        }).compile();

        customerController = app.get<CustomerController>(CustomerController);
        customerService = app.get<CustomerService>(CustomerService);
    });

    describe('findAll', () => {
        it('should return customer list', async () => {
            const result: Customer = new Customer("rpolnx23", "Rodrigo", "123")
                .withId("71fb220c-4438-4f5e-94d7-bdc514f19195")
                .withStatus(Status.DELETED);

            jest.spyOn(customerService, 'get').mockImplementation(async () => result);

            expect(await customerController.get("71fb220c-4438-4f5e-94d7-bdc514f19195")).toBe(result);
        });
    });
});
