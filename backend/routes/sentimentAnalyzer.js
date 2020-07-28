const express = require("express");
const { catchErrors } = require("../handlers/errorHandlers");
const { sentimentAnalyzer } = require("../controllers/sentimentAnalyzer");
const router = express.Router();

router.post("/sentimentAnalysis", catchErrors(sentimentAnalyzer));

module.exports = router;
