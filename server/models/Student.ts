import { Table, Column, Model, HasMany, BelongsToMany } from 'sequelize-typescript'

import Course from './Course'
import CourseStudent from './CourseStudent'
import Card from './Card'
import Activity from './Activity'

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

  // @HasMany(() => Activity)
  // activities: Activity[]

  @BelongsToMany(() => Card, {
    through: {
      model: () => Activity,
      unique: false,
    },
  })
  cardActivities: Card[]
}

export default Student
