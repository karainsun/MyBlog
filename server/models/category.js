module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '分类名称'
    } 
  }, { 
    timestamps: true,
    initialAutoIncrement: 1000 // 设置id初始值
  })

  // Category.associate = models => {
  //   Category.belongsTo(models.article, {
  //     as: 'article',
  //     foreignKey: 'articleId',
  //     targetKey: 'id',
  //     constraints: false
  //   })
  // }
  return Category
}