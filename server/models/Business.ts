import { Table, Column, Model, HasMany } from 'sequelize-typescript'
import Mentor from './Mentor'

@Table
class Business extends Model<Business> {
  @Column name: string

  @HasMany(() => Mentor)
  mentors: Mentor[]
}

export default Business
