const express = require("express");
const {
  getMedicalAppointmentPerYearAndMonth,
  postnewPatient,
  getAllPatients,
  getOnePatient,
  putUpdatePatient,
  getPersonalHistoryPatient,
  putPersonalHistoryPatient,
  getOralSympPatient,
  putOralSympPatient,
  putOdontogramPatient,
  getOdontogramPatient,
  putClinicalSignsPatient,
  getClinicalSignsPatient,
  putTreatmentsPatient,
  getTreatmentsPatient,
  getWayPayPatient,
  putWayPayPatient,
  uploadImage,
  getImagesPatient,
  deleteImage,
  postTreatmentAndPay,
  getTreatmentAndPay,
  putTreatmentsAndPay,
  deleteTreatmentAndPay,
  updateVersion,
  postMedicalAppointment,
  getMedicalAppointmentPerYearMonthAndDay,
  patchMedicalAppointmentState,
  putMedicalAppointment,
  deleteMedicalAppointment,
  getMedicalAppointmentState,
} = require("../controllers/patients.controller");
// const ensureToken = require("../token");
const upload = require("../storage");
const router = express.Router();

router.put("/update-version", updateVersion);

router.get("/medical-appointment/:state", getMedicalAppointmentState);
router.get(
  "/medical-appointment/:year/:month",
  getMedicalAppointmentPerYearAndMonth
);
router.get(
  "/medical-appointment/:year/:month/:day",
  getMedicalAppointmentPerYearMonthAndDay
);
router.post("/medical-appointment", postMedicalAppointment);
router.patch("/medical-appointment/", patchMedicalAppointmentState);
router.put("/medical-appointment/", putMedicalAppointment);
router.delete("/medical-appointment", deleteMedicalAppointment);

router.post("/treatment-and-pay", postTreatmentAndPay);
router.get("/treatment-and-pay/:dniPatient", getTreatmentAndPay);
router.put("/treatment-and-pay", putTreatmentsAndPay);
router.delete("/treatment-and-pay/:_id", deleteTreatmentAndPay);

router.delete("/delete-image", deleteImage);
router.get("/images-patient/:dni", getImagesPatient);
router.post("/upload-image/:dni", upload.single("image"), uploadImage);

router.put("/update-way-pay", putWayPayPatient);
router.get("/way-pay/:_id", getWayPayPatient);

router.put("/update-treatments", putTreatmentsPatient);
router.get("/treatments/:_id", getTreatmentsPatient);

router.put("/update-clinical-signs", putClinicalSignsPatient);
router.get("/clinical-signs/:_id", getClinicalSignsPatient);

router.put("/update-odontogram-patient", putOdontogramPatient);
router.get("/odontogram-patient/:_id", getOdontogramPatient);

router.put("/update-oral-symp-patient", putOralSympPatient);
router.get("/oral-symp-patient/:_id", getOralSympPatient);

router.put("/update-personal-history-patient", putPersonalHistoryPatient);
router.get("/personal-history-patient/:_id", getPersonalHistoryPatient);

router.post("/new-patient", postnewPatient);

router.get("/all-patients", getAllPatients);

router.get("/one-patient/:dni", getOnePatient);

router.put("/update-personal-data-patient", putUpdatePatient);

module.exports = router;
