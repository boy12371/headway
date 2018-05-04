import { Table, Column, Model, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Course from './Course';
import Student from './Student';

@Table
class CourseStudent extends Model<CourseStudent> {

  @Column code: string

  @ForeignKey(() => Course)
  @Column
  courseId: number

  @ForeignKey(() => Student)
  @Column
  studentId: number

}

export default CourseStudent
