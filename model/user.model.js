module.exports = (sequelize, DataType) => {
  const User = sequelize.define('user', {
    // attributes
    firstName: {
      type: DataType.STRING,
      allowNull: false
    },

    userName: {
      type: DataType.STRING,
      allowNull: false,
    },

    lastName: {
      type: DataType.STRING
      // allowNull defaults to true
    },

    status: {
      type: DataType.BOOLEAN,
      defaultValue: false
    }
  });
  return User;
}

