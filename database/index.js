const Sequelize = require('sequelize');
const {
  DB,
  DB_HOST,
  DB_USER,
  DB_PASS
} = process.env
const sequelize = new Sequelize(DB , DB_USER, DB_PASS, {
  DB_HOST,
  dialect: 'postgres'
})

const db = {
  // Models
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
