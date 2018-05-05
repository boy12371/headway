import { Table, Column, Model, HasMany, BelongsToMany } from 'sequelize-typescript'
import Mentor from './Mentor'
import Student from './Student'
import CourseStudent from './CourseStudent'
import BusinessStudent from './BusinessStudent'

@Table
class Business extends Model<Business> {
  @Column name: string

  @HasMany(() => Mentor)
  mentors: Mentor[]

  @BelongsToMany(() => Student, {
    through: {
      model: () => BusinessStudent,
      unique: false,
    },
  })
  students: Student[]
}

export default Business
