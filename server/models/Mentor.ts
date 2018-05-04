import { Table, Column, Model, HasMany } from 'sequelize-typescript';

@Table
class Mentor extends Model<Mentor> {
  @Column first_name: string
  @Column last_name: string
  @Column email: string
  @Column password: string
  @Column salt: string
}

export default Mentor