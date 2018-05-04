import { Table, Column, Model, HasMany } from 'sequelize-typescript';

@Table
class Unit extends Model<Unit> {
  @Column name: string
}

// import Card from './Card'
// Unit.hasMany(Card) // needs order, too

export default Unit
