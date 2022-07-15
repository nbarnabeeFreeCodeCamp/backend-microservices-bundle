const express = require("express");
const router = express.Router();
const timeStampController = require("./controllers/timeStampControllers.js");
const parserController = require("./controllers/parserControllers.js");

/*

GET Homepage

*/

router.get("/", async (req, res) => {
  try {
    res.sendFile(__dirname + "/index.html");
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" });
  }
});

/*

GET Timestamp Microservices

*/

router.get("/api/timestamp", timeStampController.currentDate);
router.get("/api/timestamp/:date", timeStampController.dateParser);

/*

GET Request Header parser

*/

router.get("/api/whoami", parserController.tsTest);

module.exports = router;
