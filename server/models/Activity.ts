import { Table, Column, Model, HasMany, ForeignKey } from 'sequelize-typescript'
import Student from './Student'
import Card from './Card'

@Table({ timestamps: true })
export class Activity extends Model<Activity> {
  // TODO: needs and auto increment id - so the key is not formed by card+student

  @Column evidence_proof: string // File
  @Column completed: Date // got quiz correct

  @ForeignKey(() => Card)
  @Column
  cardId: number

  @ForeignKey(() => Student)
  @Column
  studentId: number
}

export default Activity
