const express = require("express");
const router = express.Router();
const displayMainPage = require("../controllers/rootController");

router.get("^/$|/index(.html)?", displayMainPage);

module.exports = router;
