module.exports = (db, DataTypes) => {
  const Sensor = db.define('Sensor',{
    // attributes
    st_name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Relationships
  // Sensor.associate = models => {
  //   Sensor.hasMany(models.Bucket, {
  //     foreignKey: "children_id"
  //   })
  // }

  return Sensor;
}
