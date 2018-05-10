import { Sequelize } from 'sequelize-typescript'
import * as parse from 'parse-database-url'

const url = process.env.CLEARDB_DATABASE_URL

const config = url ? parse(url) : {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'headway',
}
const { user, password, database, host } = config

const connection = new Sequelize({
    database,
    host,
    username: user,
    password,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: false,
    modelPaths: [__dirname + '/models/*.ts'],
    logging: false,
})

export default connection
