module.exports = (sequelize, type) => {
  return sequelize.define("diaryEntry", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: type.STRING,
      allowNull: false,
    },
    title: {
      type: type.STRING,
      allowNull: false,
    },
    entry: {
      type: type.TEXT,
      allowNull: false,
    },
    sentimentScore: {
      type: type.FLOAT,
      allowNull: true,
    },
  });
};
