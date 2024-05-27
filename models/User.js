export default (sequelize, DataTypes, user) => {
    const user = sequelize.define('user', {
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
    });
    return user;
  };
