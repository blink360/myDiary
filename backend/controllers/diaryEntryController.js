const { DiaryEntry } = require("../sequelize");
let datetime = require("date-and-time");

exports.createDiaryEntry = async (req, res) => {
  let { entry, userId } = req.body;
  let date = datetime.format(new Date(), "YYYY-MM-DD HH:mm");

  if (!entry) throw "Diary entry is empty";

  await DiaryEntry.create({ date: date, userId: userId, entry: entry });

  res.status(200).json({
    message: "Diary Entry created",
    state: 1,
  });
};

exports.listAllDiaryEntries = async (req, res) => {
  let { userId } = req.body;

  let entries = await DiaryEntry.findAll({
    raw: true,
    where: { userId: userId },
  });

  if (entries) res.status(200).json(entries);
};

exports.updateDiaryEntry = async (req, res) => {
  let { entryId, userId, entry } = req.body;

  if (!entryId) throw "EntryId is required";
  if (!userId) throw "UserId is required";
  if (!entry) throw "Entry is empty";

  await DiaryEntry.update(
    { entry: entry },
    {
      where: { id: entryId, userId: userId },
    }
  );

  res.status(200).json({
    message: "Entry updated successfully",
    state: 1,
  });
};

exports.deleteDiaryEntry = async (req, res) => {
  let { entryId, userId } = req.body;

  if (!entryId) throw "EntryId is required";
  if (!userId) throw "UserId is required";

  await DiaryEntry.destroy({
    where: {
      entryId: entryId,
      userId: userId,
    },
  });

  res.status(200).json({
    message: "Entry deleted successfully",
    state: 1,
  });
};
