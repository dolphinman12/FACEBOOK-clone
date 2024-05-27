import { Sequelize } from 'sequelize';
import user from './User.js';
import post from './Post.js';
import comment from './Comment.js';
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
    user: user(sequelize, Sequelize),
    post: post(sequelize, Sequelize),
    comment: comment(sequelize, Sequelize),
  };
  
  db.User.hasMany(db.Post, { foreignKey: 'authorId' });
  db.Post.belongsTo(db.User, { foreignKey: 'authorId', as: 'author' });
  
  db.User.hasMany(db.Comment, { foreignKey: 'userId' });
  db.Comment.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });
  
  db.Post.hasMany(db.Comment, { foreignKey: 'postId' });
  db.Comment.belongsTo(db.Post, { foreignKey: 'postId', as: 'post' });
  
export default db
  
