const express = require("express");
const router = express.Router();
const createSubscriber = require("../controllers/subscribersController");

router.post("/", createSubscriber);

module.exports = router;
