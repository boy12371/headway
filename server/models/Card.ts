import { Table, Column, Model, HasMany, ForeignKey, BelongsTo, BelongsToMany, DataType } from 'sequelize-typescript'
import Unit from './Unit'
import Activity from './Activity'
import Student from './Student'

@Table({ timestamps: true })
export class Card extends Model<Card> {
  @Column name: string
  @Column slug: string
  @Column content: string
  @Column evidence_task: string
  @Column media: string
  @Column(DataType.TEXT) quiz: string

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
