const express = require("express");
const { postnewPatient, getAllPatients, getOnePatient, putUpdatePatient, getPersonalHistoryPatient, putPersonalHistoryPatient, getOralSympPatient, putOralSympPatient, putOdontogramPatient, getOdontogramPatient, putClinicalSignsPatient, getClinicalSignsPatient, putTreatmentsPatient, getTreatmentsPatient, getWayPayPatient, putWayPayPatient } = require("../controllers/patients.controller");
const ensureToken = require("../token");
const router = express.Router();

router.put("/update-way-pay",ensureToken,putWayPayPatient);
router.get("/way-pay/:_id",getWayPayPatient);

router.put("/update-treatments",ensureToken,putTreatmentsPatient);
router.get("/treatments/:_id",getTreatmentsPatient);

router.put("/update-clinical-signs",ensureToken,putClinicalSignsPatient);
router.get("/clinical-signs/:_id",getClinicalSignsPatient);

router.put("/update-odontogram-patient",ensureToken,putOdontogramPatient);
router.get("/odontogram-patient/:_id",getOdontogramPatient);

router.put("/update-oral-symp-patient",ensureToken,putOralSympPatient);
router.get("/oral-symp-patient/:_id",getOralSympPatient);

router.put("/update-personal-history-patient",ensureToken,putPersonalHistoryPatient)
router.get("/personal-history-patient/:_id",getPersonalHistoryPatient);

router.post("/new-patient",ensureToken, postnewPatient);

router.get("/all-patients",getAllPatients);

router.get("/one-patient/:dni",getOnePatient);

router.put("/update-personal-data-patient",ensureToken,putUpdatePatient);

module.exports = router;