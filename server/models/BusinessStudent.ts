import { Table, Column, Model, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript'
import Business from './Business'
import Student from './Student'

@Table({ timestamps: true })
export class BusinessStudent extends Model<BusinessStudent> {

  @Column code: string // is this for invite/accept?

  @ForeignKey(() => Business)
  @Column
  businessId: number

  @ForeignKey(() => Student)
  @Column
  studentId: number

}

export default BusinessStudent
