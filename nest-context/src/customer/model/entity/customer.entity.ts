// noinspection DuplicatedCode,DuplicatedCode

import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm'
import {Status} from './Status';

@Entity()
export default class Customer extends BaseEntity {
    static readonly Status = Status;

    @PrimaryGeneratedColumn('uuid')
    private id: string;
    @Column({length: 30, nullable: false})
    private username: string;
    @Column()
    private name: string;
    @Column({length: 30, nullable: false})
    private password: string;
    @Column({
        type: "enum",
        enum: Customer.Status,
        default: [Customer.Status.ACTIVE],
        nullable: false,
    })
    private status: Status;

    constructor(username: string, name: string, password: string) {
        super();
        this.username = username;
        this.name = name;
        this.password = password;
    }

    public getId() {
        return this.id
    }

    public setStatus(status: Status) {
        this.status = status
    }

    public withId(id: string): Customer {
        this.id = id;
        return this;
    }

    public withStatus(status: Status): Customer {
        this.status = status;
        return this;
    }
}