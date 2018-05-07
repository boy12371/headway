import { Table, Column, Model, HasMany, ForeignKey } from 'sequelize-typescript'
import Student from './Student'
import Card from './Card'

@Table
export class Activity extends Model<Activity> {
  @Column evidence_proof: string // File
  @Column completed: Date

  @ForeignKey(() => Card)
  @Column
  cardId: number

  @ForeignKey(() => Student)
  @Column
  studentId: number
}

export default Activity
