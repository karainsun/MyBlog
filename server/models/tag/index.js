const { DataTypes } = require('sequelize')
const sequelize = require('../../utils/sequelize') 

const Tag = sequelize.define('Tag', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '标签名称'
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  } 
}, {
  timestamps: false
})

module.exports = Tag