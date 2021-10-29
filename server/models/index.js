const Sequelize = require('sequelize')
const sequelize = require('../utils/sequelize');

const db = {
  'article': require("./article")(sequelize, Sequelize.DataTypes),
  'tag': require("./tag")(sequelize, Sequelize.DataTypes),
  'category': require("./category")(sequelize, Sequelize.DataTypes),
  'comment': require("./comment")(sequelize, Sequelize.DataTypes),
  'message': require("./message")(sequelize, Sequelize.DataTypes),
  'tourist': require("./tourist")(sequelize, Sequelize.DataTypes),
  'user': require("./user")(sequelize, Sequelize.DataTypes),
  'collect': require("./collect")(sequelize, Sequelize.DataTypes),
  'collect_category': require("./collectCategory")(sequelize, Sequelize.DataTypes),
  'banner': require("./banner")(sequelize, Sequelize.DataTypes)
}

Object.keys(db).forEach(modelName => { 
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize

module.exports = db 