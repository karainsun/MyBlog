const {
  DataTypes
} = require('sequelize')
const sequelize = require('../../utils/sequelize')

const Article = sequelize.define('Article', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '文章标题'
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '文章描述'
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
    type: DataTypes.STRING,
    get: function () {
      return JSON.parse(this.getDataValue('tags'));
    },
    set: function (val) {
      return this.setDataValue('tags', JSON.stringify(val));
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
  timestamps: false
})

module.exports = Article