import { Table, Column, Model, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript'
import Business from './Business'
import Course from './Course'

@Table
class BusinessCourse extends Model<BusinessCourse> {

  @Column code: string

  @ForeignKey(() => Business)
  @Column
  businessId: number

  @ForeignKey(() => Course)
  @Column
  courseId: number

}

export default BusinessCourse
