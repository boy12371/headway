import { Table, Column, Model, HasMany, BelongsToMany } from 'sequelize-typescript'
import Course from './Course'

@Table
class Admin extends Model<Admin> {
  @Column name: string
  @Column username: string
  @Column password: string
  @Column salt: string
  @Column userType: string = 'admin'

  @HasMany(() => Course)
  courses: Course[]
}

export default Admin
