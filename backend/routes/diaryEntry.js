const express = require("express");
const { catchErrors } = require("../handlers/errorHandlers");
const {
  createDiaryEntry,
  listAllDiaryEntries,
  updateDiaryEntry,
  deleteDiaryEntry,
} = require("../controllers/diaryEntryController");
const router = express.Router();

router.post("/create", catchErrors(createDiaryEntry));
router.post("/listAll", catchErrors(listAllDiaryEntries));
router.patch("/update", catchErrors(updateDiaryEntry));
router.delete("/delete", catchErrors(deleteDiaryEntry));

module.exports = router;
