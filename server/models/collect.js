module.exports = (sequelize, DataTypes) => {
  const Collect= sequelize.define('collect', {
    id: {
      type: DataTypes.INTEGER, 
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '名称'
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: 'Logo'
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '描述'
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '分类'
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '链接'
    }
  }, { 
    timestamps: true
  })
 
  return Collect
}