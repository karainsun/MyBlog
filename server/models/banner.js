module.exports = (sequelize, DataTypes) => {
  const Banner= sequelize.define('banner', {
    id: {
      type: DataTypes.INTEGER, 
      primaryKey: true,
      autoIncrement: true
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '顺序'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '标题'
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '描述'
    }, 
    banner: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '链接'
    }
  }, { 
    timestamps: true
  })
 
  return Banner
}