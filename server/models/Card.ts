import { Table, Column, Model, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Unit from './Unit';

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
}

export default Card
