import { Table, Column, Model, HasMany, BelongsToMany } from 'sequelize-typescript'

import Course from './Course'
import CourseStudent from './CourseStudent'
import Card from './Card'
import Activity from './Activity'
import Business from './Business'
import BusinessStudent from './BusinessStudent'

@Table
class Student extends Model<Student> {

  @Column first_name: string
  @Column last_name: string
  @Column email: string
  @Column password: string
  @Column salt: string
  @Column lastLoggedIn: Date

  @BelongsToMany(() => Course, {
    through: {
      model: () => CourseStudent,
      unique: false,
    },
  })
  courses: Course[]

  @BelongsToMany(() => Business, {
    through: {
      model: () => BusinessStudent,
      unique: false,
    },
  })
  businesses: Business[]

  @BelongsToMany(() => Card, {
    through: {
      model: () => Activity,
      unique: false,
    },
  })
  cardActivities: Card[]
}

export default Student
