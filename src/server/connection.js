const Sequelize = require('sequelize')
const parse = require('parse-database-url')

const url = process.env.CLEARDB_DATABASE_URL

const config = url ? parse(url) : {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'headway',
}
const { user, password, database, host } = config

// console.log(config)

module.exports = new Sequelize(database, user, password, {
    host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false,
    operatorsAliases: false,
})
