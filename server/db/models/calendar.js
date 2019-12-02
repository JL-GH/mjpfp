const Sequelize = require('sequelize');
const {db} = require('../db.js')

const Task = db.define('task', {
  taskName: {
    type: Sequelize.STRING,
    isNotNull: true
  },
  taskCompleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  taskDateDue: {
    type: Sequelize.DATEONLY,
    isNotNull: true
  },
  taskTimeDue: {
    type: Sequelize.STRING,
    isNotNull: true
  }
})

module.exports = {Task};
