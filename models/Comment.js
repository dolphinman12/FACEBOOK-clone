export default (sequelize, DataTypes, comment) => {
    const comment = sequelize.define('comment', {
      content: DataTypes.STRING,
      postId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Posts',
          key: 'id',
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    });
    return comment;
  };
  
  
