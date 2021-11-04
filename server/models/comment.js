module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '文章id'
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
    article_title: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '评论文章'
    },
    article_link: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '文章链接'
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '评论内容'
    },
    at_name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '所艾特名称'
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: '游客id'
    },
    parent_comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '父级评论id'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'comment',
    tableName: 'comment',
    timestamps: false
  })
  return Comment
}