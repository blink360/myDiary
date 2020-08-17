const express = require("express");
const { catchErrors } = require("../handlers/errorHandlers");
const {
  createDiaryEntry,
  listAllDiaryEntries,
  updateDiaryEntry,
  deleteDiaryEntry,
  listDiaryEntryById,
} = require("../controllers/diaryEntryController");
const router = express.Router();

router.post("/create", catchErrors(createDiaryEntry));
router.post("/listAll", catchErrors(listAllDiaryEntries));
router.put("/update", catchErrors(updateDiaryEntry));
router.delete("/delete", catchErrors(deleteDiaryEntry));
router.post("/listById/:id", catchErrors(listDiaryEntryById));

module.exports = router;
