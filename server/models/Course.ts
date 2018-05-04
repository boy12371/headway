import { Table, Column, Model, HasMany } from 'sequelize-typescript';

@Table
class Course extends Model<Course> {
  @Column name: string
}

// import Unit from './Unit'
// Course.hasMany(Unit) // Course:Unit is a n:n relationship because Unit can be shared among Courses

export default Course
