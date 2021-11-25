module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('article', {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true,
      comment: '文章标题'
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: '文章描述'
    },
    top: {
      type: DataTypes.INTEGER,
      allowNull: true, 
      defaultValue: 0, // 0：否，1：是
      comment: '置顶'
    },
    image: {
      type: DataTypes.STRING,
      get: function () {
        return JSON.parse(this.getDataValue('image'));
      },
      set: function (val) {
        return this.setDataValue('image', JSON.stringify(val));
      },
      allowNull: false,
      comment: '封面图'
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '所属分类'
    },
    tags: {
      type: DataTypes.JSON,
      get: function () {
        return this.getDataValue('tags');
      },
      set: function (val) {
        return this.setDataValue('tags', val);
      },
      allowNull: false,
      comment: '标签'
    },
    isComent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      comment: '予评与否'
    },
    isReprint: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      comment: '是否转载'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: '文章内容'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false,
    initialAutoIncrement: 1000 // 设置id初始值
  })

  // Article.associate = (models) => {
  //   Article.hasMany(models.tag)
  //   Article.hasOne(models.category)
  // }
  return Article
}