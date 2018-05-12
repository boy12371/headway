import { omit } from 'lodash'
import { Table, Column, Model, HasMany, BelongsToMany, Unique } from 'sequelize-typescript'
import { Logger } from '../logger'
import Course from './Course'
import Business from './Business'

@Table({ timestamps: true })
export class Admin extends Model<Admin> {
  @Column name: string
  @Unique @Column email: string
  @Column password: string
  @Column salt: string
  @Column readonly userType: string = 'admin'

  @HasMany(() => Business)
  businesses: Business[]

  @HasMany(() => Course)
  courses: Course[]

  toJSON() {
    return omit(this.dataValues, ['password', 'salt'])
  }
}

export default Admin
