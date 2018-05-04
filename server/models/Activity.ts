import { Table, Column, Model, HasMany } from 'sequelize-typescript';

@Table
class Activity extends Model<Activity> {
  evidence_proof: string // File
  completed: Date
}

// const Student = require('./Student')
// const Card = require('./Card')

// Activity.hasOne(Student)
// Activity.hasOne(Card)

export default Activity
