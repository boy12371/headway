import { Table, Column, Model, HasMany, BelongsToMany, Scopes } from 'sequelize-typescript'

import Course from './Course'
import CourseStudent from './CourseStudent'
import Card from './Card'
import Activity from './Activity'
import Business from './Business'
import BusinessStudent from './BusinessStudent'

@Scopes({
  public: {
    attributes: ['id', 'first_name', 'last_name', 'email'],
  },
})
@Table({ timestamps: true })
export class Student extends Model<Student> {

  @Column first_name: string
  @Column last_name: string
  @Column email: string
  @Column password: string
  @Column salt: string
  @Column lastLoggedIn: Date
  @Column readonly userType: string = 'student'

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

  displayName() {
    const name = [this.first_name, this.last_name].join(' ').trim()
    return name
  }

  addToCourse(courseId) {
    const studentId = this.id
    return CourseStudent.findOrCreate({ where: { courseId, studentId }})
  }
}

export default Student
