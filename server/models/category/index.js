const { 
  DataTypes,
  Model
} = require('sequelize')
const sequelize = require('../../utils/sequelize') 

class Category extends Model {}

Category.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '分类名称'
  }, 
  parent_name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '--',
    comment: '分类父级，默认为--'
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'category',
  tableName: 'category',
  timestamps: false
})

module.exports = Category