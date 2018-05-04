import { Table, Column, Model, HasMany, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import Unit from './Unit'
import Activity from './Activity'
import Student from './Student'

@Table
class Card extends Model<Card> {
  @Column name: string
  @Column content: string
  @Column evidence_task: string
  @Column quiz: string
  @Column media: string

  @ForeignKey(() => Unit)
  @Column
  unitId: number

  @BelongsTo(() => Unit)
  unit: Unit

  @BelongsToMany(() => Student, {
    through: {
      model: () => Activity,
      unique: false,
    },
  })
  activityStudents: Student[]
}

export default Card
