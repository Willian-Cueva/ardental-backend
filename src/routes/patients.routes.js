const express = require("express");
const { postnewPatient, getAllPatients, getOnePatient, putUpdatePatient, getPersonalHistoryPatient, putPersonalHistoryPatient, getOralSympPatient, putOralSympPatient, putOdontogramPatient, getOdontogramPatient, putClinicalSignsPatient, getClinicalSignsPatient, putTreatmentsPatient, getTreatmentsPatient, getWayPayPatient, putWayPayPatient } = require("../controllers/patients.controller");
const router = express.Router();

router.put("/update-way-pay",putWayPayPatient);
router.get("/way-pay/:_id",getWayPayPatient);

router.put("/update-treatments",putTreatmentsPatient);
router.get("/treatments/:_id",getTreatmentsPatient);

router.put("/update-clinical-signs",putClinicalSignsPatient);
router.get("/clinical-signs/:_id",getClinicalSignsPatient);

router.put("/update-odontogram-patient",putOdontogramPatient);
router.get("/odontogram-patient/:_id",getOdontogramPatient);

router.put("/update-oral-symp-patient",putOralSympPatient);
router.get("/oral-symp-patient/:_id",getOralSympPatient);

router.put("/update-personal-history-patient",putPersonalHistoryPatient)
router.get("/personal-history-patient/:_id",getPersonalHistoryPatient);

router.post("/new-patient", postnewPatient);

router.get("/all-patients",getAllPatients);

router.get("/one-patient/:dni",getOnePatient);

router.put("/update-personal-data-patient",putUpdatePatient);

module.exports = router;