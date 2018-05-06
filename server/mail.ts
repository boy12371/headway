const fs = require('fs')
const handlebars = require('handlebars')

const readFile = name => fs.readFileSync(`./views/mail/${name}`, 'utf8')
const getTemplate = name => handlebars.compile(readFile(name))

const mail = {
    FROM: 'Headway <noreply@headwa>',
    welcome: {
        subject: name => `Headway registreation`,
        text: getTemplate('welcome.txt'),
        html: getTemplate('welcome.handlebars'),
    },
}

export default mail
