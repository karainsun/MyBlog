module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    id: {
      type: DataTypes.STRING(20), 
      primaryKey: true 
    },
    touristId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '游客id'
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '头像'
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '昵称'
    },
    qq_email: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'QQ邮箱'
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '留言内容'
    },
    at_name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '所艾特名称'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '前台用户id'
    },
    parent_message_id: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '父级留言id'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'message',
    tableName: 'message',
    timestamps: false
  })
  return Message
}