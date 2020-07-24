const express = require("express");
const { catchErrors } = require("../handlers/errorHandlers");
const { login, register } = require("../controllers/userController");
const router = express.Router();

router.post("/login", catchErrors(login));
router.post("/register", catchErrors(register));

module.exports = router;
