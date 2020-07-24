const express = require("express");
const { catchErrors } = require("../handlers/errorHandlers");
const {
  createDiaryEntry,
  listAllDiaryEntries,
  updateDiaryEntry,
} = require("../controllers/diaryEntryController");
const router = express.Router();

router.post("/create", catchErrors(createDiaryEntry));
router.post("/listAll", catchErrors(listAllDiaryEntries));
router.patch("/update", catchErrors(updateDiaryEntry));
module.exports = router;
