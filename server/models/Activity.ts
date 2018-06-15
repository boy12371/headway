import { Table, Column, Model, HasMany, ForeignKey } from 'sequelize-typescript'
import Student from './Student'
import Card from './Card'

@Table({ timestamps: true })
export class Activity extends Model<Activity> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number

  @Column evidence_proof: string // File
  @Column completed: boolean

  @ForeignKey(() => Card)
  @Column
  cardId: number

  @ForeignKey(() => Student)
  @Column
  studentId: number
}

export default Activity
