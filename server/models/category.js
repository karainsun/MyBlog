module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
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

  Category.associate = models => {
    Category.belongsTo(models.article, {
      as: 'article',
      foreignKey: 'articleId',
      targetKey: 'id',
      constraints: false
    })
  }
  return Category
}