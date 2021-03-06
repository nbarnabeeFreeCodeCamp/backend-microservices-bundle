const express = require("express");
const router = express.Router();
const timeStampController = require("./controllers/timeStampController.js");
const parserController = require("./controllers/parserController.js");
const urlController = require("./controllers/urlController.js");
const exerciseController = require("./controllers/exerciseController.js");
const uploadController = require("./controllers/uploadController.js");

/*

GET Homepage

*/

router.get("/", async (req, res) => {
  try {
    res.sendFile(require("path").resolve("./") + "/index.html");
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

router.get("/api/whoami", parserController.whoami);

/* 

GET & PUT URL Shortener Controller

*/

router.post("/api/shorturl", urlController.urlShorten);
router.get("/api/shorturl/:id", urlController.urlRedirect);

/* 

Exercises API

*/

// GET & POST to /api/users

router
  .route("/api/users")
  .post(exerciseController.postNewUser)
  .get(exerciseController.getUsers);

// POST to /api/users/:id/exercises

router.post("/api/users/:id/exercises", exerciseController.postExercise);

// GET from /api/users/:id/logs

router.get("/api/users/:id/logs", exerciseController.getLogs);

/*

// POST to /api/fileupload

*/

const multer = require("multer");
router.post(
  "/api/fileanalyse",
  multer().single("upfile"),
  uploadController.uploadFile
);

module.exports = router;
