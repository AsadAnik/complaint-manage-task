import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Ticket } from '.';

@Entity('user')
class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    // region Firstname
    @Column()
    firstname!: string;

    // region Lastname
    @Column()
    lastname!: string;

    // region Email
    @Column({ unique: true })
    email!: string;

    // region Password
    @Column()
    password!: string;

    // region Role
    @Column({ default: 'Customer' })
    role!: 'Admin' | 'Customer';

    // region Refresh Token
    @Column({ nullable: true })
    refreshToken!: string;

    // Tickets created by the customer
    @OneToMany(() => Ticket, (ticket) => ticket.customer, { nullable: true })
    customerTickets!: Ticket[];

    // Tickets assigned to the admin
    @OneToMany(() => Ticket, (ticket) => ticket.admin, { nullable: true })
    adminTickets!: Ticket[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;
}

export default User;
