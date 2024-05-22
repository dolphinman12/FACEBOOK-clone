import { Sequelize } from 'sequelize';
import user from './user.js';
import post from './post.js';
import comment from './comment.js';
import config from '../config/config.json'assert { type: "json" };

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
  }
);

const db = {
    sequelize,
    Sequelize,
    User: user(sequelize, Sequelize),
    Post: post(sequelize, Sequelize),
    Comment: comment(sequelize, Sequelize),
  };
  
  db.User.hasMany(db.Post, { foreignKey: 'authorId' });
  db.Post.belongsTo(db.User, { foreignKey: 'authorId', as: 'author' });
  
  db.User.hasMany(db.Comment, { foreignKey: 'userId' });
  db.Comment.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });
  
  db.Post.hasMany(db.Comment, { foreignKey: 'postId' });
  db.Comment.belongsTo(db.Post, { foreignKey: 'postId', as: 'post' });
  
  export default db;
  