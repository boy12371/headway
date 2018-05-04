import { Table, Column, Model, HasMany } from 'sequelize-typescript'

import Course from './Course'

@Table
class Student extends Model<Student> {

  @Column first_name: string
  @Column last_name: string
  @Column email: string
  @Column password: string
  @Column salt: string
  @Column lastLoggedIn: Date

  // @HasMany(() => Course)
  // courses: Course[]
}

export default Student
