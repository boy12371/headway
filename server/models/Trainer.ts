import { Table, Column, Model, HasMany } from 'sequelize-typescript';

@Table
class Trainer extends Model<Trainer> {
    @Column first_name: string
    @Column last_name: string
    @Column email: string
    @Column password: string
    @Column salt: string
}

export default Trainer
