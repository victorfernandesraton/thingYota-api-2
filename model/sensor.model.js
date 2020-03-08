module.exports = (db, DataTypes) => {
  const Sensor = db.define('sensor',{
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
  Sensor.associate = models => {
    Sensor.belongsTo(models.Bucket, {
      foreignKey: "parentId",
      as: 'parent'
    })
  }

  return Sensor;
}
