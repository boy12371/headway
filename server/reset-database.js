const Admin = require('./models/Admin')

const connection = require('./connection')

const bcrypt = require('bcrypt')
const saltRounds = 10

const createAdmin = (username, plainTextPassword) => {
    const salt = bcrypt.genSaltSync(saltRounds)
    const password = bcrypt.hashSync(plainTextPassword, salt)
    Admin.create({
        username,
        password,
        salt,
    })
}

connection.sync({ force: true }).then(() => {
    Promise.all([
        createAdmin('root', 'Dcubed!!'),
        createAdmin('s', 'p'),
        createAdmin('j', 'p'),
        // clients.forEach(createClient)
    ]).then(() => {
        connection.close()
        console.log('Done')
    })
})
