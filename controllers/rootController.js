const path = require("path");

const displayMainPage = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
};

module.exports = displayMainPage;
