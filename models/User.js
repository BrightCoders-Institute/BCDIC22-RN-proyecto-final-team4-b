const Sequelize = require('sequelize')

const sequelize = new Sequelize('wadb', 'admin', process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: '3306',
  dialect: 'mysql'
})

sequelize.sync({ alter: true })

const User = sequelize.define(
  'Users',
  {
    id_user: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: 12,
      autoIncrement: true,

      allowNull: false
    },
    user_name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: Sequelize.DataTypes.DATE,
      allowNull: false
    },
    partner_name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
)

User.sync({
  alter: true
})
  .then(() => {
    console.log('tabled added succesfully')
  })
  .catch(err => {
    console.log(err)
  })

module.exports = User
