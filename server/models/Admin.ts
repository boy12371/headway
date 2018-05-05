import { Table, Column, Model, HasMany } from 'sequelize-typescript'

@Table
class Admin extends Model<Admin> {
  @Column name: string
  @Column username: string
  @Column password: string
  @Column salt: string
}

export default Admin
