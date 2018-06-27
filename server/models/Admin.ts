import { omit } from 'lodash'
import { Table, Column, Model, HasMany, BelongsToMany, Unique } from 'sequelize-typescript'
import { Logger } from '../logger'
import Course from './Course'
import Business from './Business'

const includes = (models, id) => models.map(d => d.id).indexOf(id) >= 0

@Table({ timestamps: true })
export class Admin extends Model<Admin> {
  @Column name: string
  @Column first_name: string
  @Column last_name: string
  @Unique @Column email: string
  @Column password: string
  @Column salt: string
  @Column readonly userType: string = 'admin'

  @HasMany(() => Business)
  businesses: Business[]

  @HasMany(() => Course)
  courses: Course[]

  getStudents() {
    return this.businesses.reduce((previousValue, currentValue) => {
      return previousValue.concat(currentValue.students)
    }, [])
  }

  ownsStudent(id) {
    return includes(this.getStudents(), id)
  }

  ownsCourse(id) {
    return includes(this.courses, id)
  }

  getUnits() {
    return this.courses.reduce((previousValue, currentValue) => {
      return previousValue.concat(currentValue.units)
    }, [])
  }

  ownsUnit(id) {
    const ids = this.getUnits().map(student => student.id)
    return ids.indexOf(id) >= 0
  }

  getCards() {
    return this.getUnits().reduce((previousValue, currentValue) => {
      return previousValue.concat(currentValue.cards)
    }, [])
  }

  ownsCard(id) {
    const ids = this.getCards().map(card => card.id)
    return ids.indexOf(id) >= 0
  }

  toJSON() {
    return omit(this.dataValues, ['password', 'salt'])
  }
}

export default Admin
