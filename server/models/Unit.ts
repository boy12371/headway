import Sequelize from 'sequelize'
import connection from '../connection'

const Unit = connection.define('unit', {
    name: Sequelize.STRING,
})

import Card from './Card'

Unit.hasMany(Card) // needs order, too

export default Unit
