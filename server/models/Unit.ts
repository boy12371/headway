import { Table, Column, Model, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript'
import Course from './Course'
import Card from './Card'

@Table({ timestamps: true })
export class Unit extends Model<Unit> {
  @Column
  name: string

  @ForeignKey(() => Course)
  @Column
  courseId: number

  @BelongsTo(() => Course)
  course: Course

  @HasMany(() => Card)
  cards: Card[]
}

export default Unit
