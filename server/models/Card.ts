import { Table, Column, Model, HasMany } from 'sequelize-typescript';

@Table
class Card extends Model<Card> {
  @Column name: string
  @Column content: string
  @Column evidence_task: string
  @Column quiz: string
  @Column media: string
}

export default Card
