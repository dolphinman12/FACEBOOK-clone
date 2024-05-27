export default (sequelize, DataTypes, post) => {
    const post = sequelize.define('post', {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      authorId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    });
    return post;
  };
  
