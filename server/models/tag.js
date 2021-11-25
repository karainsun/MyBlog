module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('tag', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '标签名称'
    } 
  }, {
    timestamps: true,
    initialAutoIncrement: 1000 // 设置id初始值
  })

  // Tag.associate = models => {
  //   Tag.belongsTo(models.article, {
  //     as: 'article',
  //     foreignKey: 'articleId',
  //     targetKey: 'id',
  //     constraints: false
  //   })
  // }
  return Tag
}