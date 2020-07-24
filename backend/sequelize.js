const Sequelize = require("sequelize");

const UserModel = require("./models/user");
const DiaryEntryModel = require("./models/diaryEntry");

const sequelize = new Sequelize(
  "postgres://postgres:admin@127.0.0.1:5432/myDiary"
); //PGSQL connection

const User = UserModel(sequelize, Sequelize); //Create User Model
const DiaryEntry = DiaryEntryModel(sequelize, Sequelize); //Create Diary Entry Model

User.hasMany(DiaryEntry);
DiaryEntry.belongsTo(User);

sequelize.sync().then(() => {
  console.log(`Databases and tables created successfully`);
});

module.exports = { User, DiaryEntry };
