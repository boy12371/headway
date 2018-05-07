import { Table, Column, Model, HasMany, BelongsToMany, Unique } from 'sequelize-typescript'
import Course from './Course'

@Table
class Admin extends Model<Admin> {
  @Column name: string
  @Unique @Column email: string
  @Column password: string
  @Column salt: string
  @Column userType: string = 'admin'

  @HasMany(() => Course)
  courses: Course[]
}

export default Admin
