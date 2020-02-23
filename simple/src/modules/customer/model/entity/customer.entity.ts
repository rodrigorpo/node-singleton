import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

enum Status {
    ACTIVE = 'ACTIVE',
    DELETED= 'DELETED',
}

@Entity()
export default class Customer extends BaseEntity {
    static readonly Status = Status

    @PrimaryGeneratedColumn('uuid')
    private id: string
    @Column({ length: 30, nullable: false })
    private username: string
    @Column()
    private name: string
    @Column({ length: 30, nullable: false })
    private password: string
    @Column({
        type: "enum",
        enum: Status,
        default: [Status.ACTIVE],
        nullable: false,
    })
    private status: Status

    constructor(username: string, name: string, password: string) {
        super()
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
}
