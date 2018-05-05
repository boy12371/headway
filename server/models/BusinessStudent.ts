import { Table, Column, Model, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript'
import Business from './Business'
import Student from './Student'

@Table
class BusinessStudent extends Model<BusinessStudent> {

  @Column code: string

  @ForeignKey(() => Business)
  @Column
  businessId: number

  @ForeignKey(() => Student)
  @Column
  studentId: number

}

export default BusinessStudent
