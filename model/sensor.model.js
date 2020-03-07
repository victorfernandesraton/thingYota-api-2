const Sequelize = require('sequelize')
const db = require('../database/index')
const Bucket = require('../model/bucket.model')

module.exports = db.define('sensor', {
  // attributes
  st_name: {
    type: Sequelize.STRING,
    allowNull: false
  },

  type: {
    type: Sequelize.STRING,
    allowNull: false,

  },

  // Asociação um para muitos
  bucket_parent: {
    type: Sequelize.HasMany(Bucket),
    allowNull: false
  },

  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
});
