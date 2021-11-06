const bcrypt = require('bcryptjs') 

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true, 
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false, 
      comment: '用户名'
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: 'user_email_unique',
      comment: '邮箱'
    },
    password: {
      type: DataTypes.STRING,
      set(val) {
        // 加密
        const salt = bcrypt.genSaltSync(10);
        // 生成加密密码
        const psw = bcrypt.hashSync(val, salt);
        this.setDataValue("password", psw);
      },
      allowNull: false,
      comment: '密码'
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
      comment: '是否禁用：true-开启，false-禁用'
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true, 
      comment: '头像',
      defaultValue: 'http://cdn.kayrain.cn/defaultavatar.jpeg',
    },
    sign: {
      type: DataTypes.STRING,
      allowNull: true, 
      comment: '签名'
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      comment: '是否为管理员'
    },
    introduction: {
      type: DataTypes.TEXT,
      allowNull: true, 
      comment: '签名'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false
  })
  return User
} 