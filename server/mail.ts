const fs = require('fs')
const handlebars = require('handlebars')

const readFile = name => fs.readFileSync(`${__dirname}/views/mail/${name}`, 'utf8')
const getTemplate = name => handlebars.compile(readFile(name))

const mail = {
  FROM: 'Headway <noreply@headway>',
  welcome: {
    subject: name => `Headway registration`,
    text: getTemplate('welcome.txt'),
    html: getTemplate('welcome.handlebars'),
  },
  invite: {
    subject: `Headway invite`,
    text: getTemplate('invite.txt'),
    html: getTemplate('invite.handlebars'),
  },
}

export default mail
