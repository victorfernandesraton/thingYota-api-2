const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB || "testedb", 'postgres', '123456', {
  host: process.env.DB_HOST,
  dialect: 'postgres'
})

// Models
const Bucket = require('../model/bucket.model');
const Sensor = require('../model/sensor.model');
const User = require('../model/user.model');
const Register = require('../model/register.model');

const db = {
  User : sequelize.import('../model/user.model'),
  Bucket : sequelize.import('../model/bucket.model'),
  Sensor : sequelize.import('../model/sensor.model'),
  sequelize: sequelize,
  Sequelize: Sequelize
};

Object.keys(db).forEach((nodeLName) => {
  if ('associate' in db[nodeLName]) {
    db[nodeLName].associate(db)
  }
});
// Relations
db.Bucket.hasMany(db.Sensor)
db.Sensor.belongsTo(db.Bucket)

module.exports=db
