import { Table, Column, Model, HasMany, ForeignKey, BelongsTo, BelongsToMany } from 'sequelize-typescript'
import Student from './Student'
import Unit from './Unit'
import CourseStudent from './CourseStudent'
import Business from './Business'
import BusinessCourse from './BusinessCourse'

@Table
class Course extends Model<Course> {
  @Column name: string

  @HasMany(() => Unit)
  units: Unit[]

  @BelongsToMany(() => Business, {
    through: {
      model: () => BusinessCourse,
      unique: false,
    },
  })
  businesses: Business[]

  @BelongsToMany(() => Student, {
    through: {
      model: () => CourseStudent,
      unique: false,
    },
  })
  students: Student[]
}

export default Course
