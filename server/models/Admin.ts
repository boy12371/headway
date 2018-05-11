import { omit } from 'lodash'
import { Table, Column, Model, HasMany, BelongsToMany, Unique } from 'sequelize-typescript'
import Course from './Course'
import { Logger } from '../logger'

@Table({ timestamps: true })
export class Admin extends Model<Admin> {
  @Column name: string
  @Unique @Column email: string
  @Column password: string
  @Column salt: string
  @Column readonly userType: string = 'admin'

  @HasMany(() => Course)
  courses: Course[]

  toJSON() {
    return omit(this.dataValues, ['password', 'salt'])
  }
}

export default Admin
