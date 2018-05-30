import * as slug from 'slug'
import { Table, Column, Model, HasMany, ForeignKey, BelongsTo, BelongsToMany, BeforeUpdate, BeforeCreate, DataType, Scopes } from 'sequelize-typescript'
import Unit from './Unit'
import Activity from './Activity'
import Student from './Student'
import { Course } from './Course'

@Scopes({
  includeCourse: {
    include: [{
      model: () => Unit,
      include: [
        {
          model: () => Course
        }
      ]
    }]
  }
})
@Table({ timestamps: true })
export class Card extends Model<Card> {
  @Column name: string
  @Column slug: string
  @Column(DataType.TEXT) content: string
  @Column evidence_task: string
  @Column media: string
  @Column(DataType.TEXT) quiz: string

  @BeforeUpdate
  @BeforeCreate
  static slugify(instance: Card) {
    instance.slug = slug(instance.name)
  }

  @ForeignKey(() => Unit)
  @Column
  unitId: number

  @BelongsTo(() => Unit)
  unit: Unit

  @BelongsToMany(() => Student, {
    through: {
      model: () => Activity,
      unique: false,
    },
  })
  activityStudents: Student[]
}

export default Card
