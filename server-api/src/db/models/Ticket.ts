import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IsString, IsNotEmpty } from 'class-validator';
import { User } from '.';

@Entity('ticket')
class Ticket {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    // region Subject
    @Column()
    @IsString()
    @IsNotEmpty()
    subject!: string;

    // region Description
    @Column({ nullable: true })
    @IsString()
    @IsNotEmpty()
    description!: string;

    // region Status
    @Column({ default: 'Open' })
    @IsString()
    @IsNotEmpty()
    status!: 'Open' | 'Resolved' | 'Closed';

    // Relationship to the User entity as a customer
    @ManyToOne(() => User, (user) => user.customerTickets, { onDelete: 'CASCADE', nullable: true })
    @JoinColumn({ name: 'customerId' }) // Defines the foreign key column
    customer!: User;

    // Relationship to the User entity as an admin
    @ManyToOne(() => User, (user) => user.adminTickets, { nullable: true })
    @JoinColumn({ name: 'adminId' }) // Defines the foreign key column
    admin!: User | null;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;
}

export default Ticket;
