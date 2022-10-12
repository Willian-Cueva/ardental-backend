const express = require("express");
const { postnewPatient, getAllPatients, getOnePatient, putUpdatePatient, getPersonalHistoryPatient, putPersonalHistoryPatient, getOralSympPatient, putOralSympPatient } = require("../controllers/patients.controller");
const router = express.Router();

router.put("/update-oral-symp-patient",putOralSympPatient);
router.get("/oral-symp-patient/:_id",getOralSympPatient);

router.put("/update-personal-history-patient",putPersonalHistoryPatient)
router.get("/personal-history-patient/:_id",getPersonalHistoryPatient);

router.post("/new-patient", postnewPatient);

router.get("/all-patients",getAllPatients);

router.get("/one-patient/:dni",getOnePatient);

router.put("/update-personal-data-patient",putUpdatePatient);

module.exports = router;