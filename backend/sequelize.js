const Sequelize = require("sequelize");

const UserModel = require("./models/user");
const DiaryEntryModel = require("./models/diaryEntry");

const sequelize = new Sequelize(
  `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/myDiary`
); //PGSQL connection

const User = UserModel(sequelize, Sequelize); //Create User Model
const DiaryEntry = DiaryEntryModel(sequelize, Sequelize); //Create Diary Entry Model

User.hasMany(DiaryEntry);
DiaryEntry.belongsTo(User);

sequelize.sync().then(() => {
  console.log(`Databases and tables created successfully`);
});

module.exports = { User, DiaryEntry };
