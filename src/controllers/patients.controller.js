const patientsCtrl = {};
const PatientModel = require("../models/patient");
const PersonalHistoryModel = require("../models/personalhistory");
const OralSympModel = require("../models/oralSymp");
const OdontogramModel = require("../models/odontogram");
const ClinicalSygnsModel = require("../models/clinicalSigns");
const TreatmentModel = require("../models/treatment")
const WayPayModel = require("../models/wayPay")

patientsCtrl.postnewPatient = async (req, res) => {
  try {
    const {
      PersonaData,
      PersonalHistory,
      OralSymp,
      Odontogram,
      ClinicalSygns,
      Treatments,
      WayPay,
    } = req.body;
    const patient = new PatientModel(PersonaData);
    let patient_id = 0;
    await patient.save().then(pt =>{
        patient_id = String(pt._id);
    });
    if(patient_id === 0)throw new Error("Error fatal - no se ha guardado correctamente el paciente")
    PersonalHistory.patient = patient_id;
    const personalhistory =new PersonalHistoryModel(PersonalHistory);
    await personalhistory.save()

    OralSymp.patient = patient_id;
    const oralSymp = new OralSympModel(OralSymp);
    await oralSymp.save();

    Odontogram.patient = patient.id;
    const odontogram = new OdontogramModel(Odontogram);
    await odontogram.save();

    ClinicalSygns.patient = patient_id;
    const clinicalSigns = new ClinicalSygnsModel(ClinicalSygns);
    await clinicalSigns.save();

    Treatments.patient = patient_id;
    const treatments = new TreatmentModel(Treatments);
    await treatments.save();

    WayPay.patient = patient_id;
    const wayPay = new WayPayModel(WayPay);
    await wayPay.save();

    res.json({ status: "ok" });
  } catch (error) {
    let response = {status:"Error"}
    switch (error.code) {
      case 11000:
        response.status = "Este paciente ya está registrado";
        break;
    
      default:
        response.status = "Ha ocurrido un error en el servidor al guardar el nuevo paciente"
        break;
    }
    console.log(error);

    res.json(response);
  }
};

module.exports = patientsCtrl;
