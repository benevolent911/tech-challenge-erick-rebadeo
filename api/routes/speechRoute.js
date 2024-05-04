const express = require("express");
const { getSpeeches, getSpeech, createSpeech, updateSpeech, deleteSpeech } = require("../controllers/speechController");

const router = express.Router();

router.get("/", getSpeeches);

router.get("/:id", getSpeech);

router.post("/", createSpeech);

router.put("/:id", updateSpeech);

router.delete("/:id", deleteSpeech);

module.exports = router;
