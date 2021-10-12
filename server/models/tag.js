module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('tag', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '标签名称'
    } 
  }, {
    timestamps: true
  })

  Tag.associate = models => {
    Tag.belongsTo(models.article, {
      as: 'article',
      foreignKey: 'articleId',
      targetKey: 'id',
      constraints: false
    })
  }
  return Tag
}