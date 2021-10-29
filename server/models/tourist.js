module.exports = (sequelize, DataTypes) => {
  const Tourist = sequelize.define('tourist', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: '游客id'
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '头像'
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '昵称'
    },
    qq_email: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'QQ邮箱'
    },
    blog: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '博客地址'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'tourist',
    tableName: 'tourist',
    timestamps: false
  })
  return Tourist
}