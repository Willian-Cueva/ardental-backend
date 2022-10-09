const express = require("express");
const { postnewPatient } = require("../controllers/patients.controller");
const router = express.Router();

// router.get("/all", postnewPatient);
router.post("/new-patient", postnewPatient);

module.exports = router;