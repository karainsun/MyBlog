module.exports = (sequelize, DataTypes) => {
  const CollectCategory = sequelize.define('collect_category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '分类名称'
    } 
  }, { 
    timestamps: true
  })
 
  return CollectCategory
}