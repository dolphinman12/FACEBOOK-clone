export default (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
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
    return Comment;
  };
  
  