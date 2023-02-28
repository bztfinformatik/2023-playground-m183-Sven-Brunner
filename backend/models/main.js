const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('M183_CHAT', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
  });

  

class Post extends Model {}
Post.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: DataTypes.TEXT,
  title: DataTypes.STRING,
  parent_id: DataTypes.INTEGER,
  author_id: DataTypes.INTEGER,
  timestamp : DataTypes.TIME
}, { sequelize, modelName: 'post' });

class User extends Model {}
User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstname: DataTypes.STRING,
  lastname: DataTypes.STRING,
  pwd: DataTypes.STRING,
  username: DataTypes.STRING,
  avatar:DataTypes.STRING
}, { sequelize, modelName: 'user' });

class Vote extends Model {}
Vote.init({
  user_id: DataTypes.INTEGER,
  posting_id: DataTypes.INTEGER,
  isupvote : DataTypes.BOOLEAN
}, { sequelize, modelName: 'vote' });

Post.belongsTo(User, { as: 'Author', foreignKey: 'user_id' });
Vote.belongsTo(User, { as: 'Voter', foreignKey: 'user_id' });
Vote.belongsTo(Post, { as: 'VotedPost', foreignKey: 'posting_id' });
Post.hasMany(Post, { as: 'ChildPosts', foreignKey: 'parent_id' });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Vote = Vote;


module.exports = db;