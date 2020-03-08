module.exports = (sequelize, DataTypes) => {
  const Bucket = sequelize.define('bucket', {
    // attributes
    st_name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  })

  // Relatinship
  Bucket.associate= (models) => {
    Bucket.hasMany(models.Sensor, {
      foreignKey: "parentId",
      as: "parent"
    })
  }
  return Bucket
}

