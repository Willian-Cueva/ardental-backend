const patientsCtrl = {};
const PatientModel = require("../models/patient");
const PersonalHistoryModel = require("../models/personalhistory");
const OralSympModel = require("../models/oralSymp");
const OdontogramModel = require("../models/odontogram");
const ClinicalSygnsModel = require("../models/clinicalSigns");
const TreatmentModel = require("../models/treatment");
const WayPayModel = require("../models/wayPay");
const { dniValidate } = require("../helpers/validations");

patientsCtrl.putOralSympPatient = async (req, res) => {
  console.log(req.body);
  try {
    const {
      halitosis,
      BleedingGums,
      xerostomia,
      bruxismo,
      hypersensitivity,
      _id,
    } = req.body;
    const oralSymp = await OralSympModel.findOne({patient: _id})
    oralSymp.halitosis =halitosis
    oralSymp.BleedingGums =BleedingGums
    oralSymp.xerostomia =xerostomia
    oralSymp.bruxismo =bruxismo
    oralSymp.hypersensitivity.acid =hypersensitivity.acid
    oralSymp.hypersensitivity.cool =hypersensitivity.cool
    oralSymp.hypersensitivity.hot =hypersensitivity.hot
    oralSymp.hypersensitivity.sweet =hypersensitivity.sweet
    oralSymp.hypersensitivity.touch =hypersensitivity.touch
    await oralSymp.save()
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    return res.json({
      status:
        "Ocurrio un error en el backend al actualizar los antecedentes personales del paciente",
    });
  }
};

patientsCtrl.getOralSympPatient = async (req, res) => {
  try {
    const { _id } = req.params;
    const data = await OralSympModel.findOne({ patient: _id });
    console.log(data,"data get");
    return res.json({ status: "ok", data });
  } catch (error) {
    console.log(error);
    return res.json({
      status:
        "Ha ocurrido un error al traer la informacion de los antecedentes personales del paciente",
    });
  }
};

patientsCtrl.putPersonalHistoryPatient = async (req, res) => {
  console.log(req.body);
  try {
    const {
      disorders,
      bloodPressure,
      heartDiseases,
      medication,
      otherDiseases,
      _id,
    } = req.body;
    const personalhistory = await PersonalHistoryModel.findOne({patient:_id})
    personalhistory.disorders = disorders;
    personalhistory.bloodPressure = bloodPressure;
    personalhistory.heartDiseases = heartDiseases;
    personalhistory.medication = medication;
    personalhistory.otherDiseases = otherDiseases;
    await personalhistory.save();
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    return res.json({
      status:
        "Ocurrio un error en el backend al actualizar los antecedentes personales del paciente",
    });
  }
};

patientsCtrl.getPersonalHistoryPatient = async (req, res) => {
  try {
    const { _id } = req.params;
    const data = await PersonalHistoryModel.findOne({ patient: _id });
    console.log(data);
    return res.json({ status: "ok", data });
  } catch (error) {
    console.log(error);
    return res.json({
      status:
        "Ha ocurrido un error al traer la informacion de los antecedentes personales del paciente",
    });
  }
};

patientsCtrl.putUpdatePatient = async (req, res) => {
  try {
    const {
      names,
      profession,
      phone,
      direction,
      maritalStatus,
      sex,
      dateBorn,
      reason,
      _id,
    } = req.body;
    const patient = await PatientModel.findById(_id);
    patient.names = names;
    patient.profession = profession;
    patient.phone = phone;
    patient.direction = direction;
    patient.maritalStatus =maritalStatus;
    patient.sex = sex;
    patient.dateBorn = dateBorn;
    patient.reason =reason;
    await patient.save();
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    return res.json({
      status:
        "Ocurrio un error en el backend al actualizar los datos personales del paciente",
    });
  }
};

patientsCtrl.getOnePatient = async (req, res) => {
  try {
    const { dni } = req.params;
    const patient = await PatientModel.findOne({ dni });
    return res.json({ status: "ok", data: patient });
  } catch (error) {
    return res.json({ status: "No se pudo obtener dicho paciente" });
  }
};

patientsCtrl.getAllPatients = async (req, res) => {
  try {
    const patients = await PatientModel.find().exec();
    return res.json({ status: "ok", data: patients });
  } catch (error) {
    let response = { status: "Error" };
    res.json(response);
  }
};

patientsCtrl.postnewPatient = async (req, res) => {
  console.log("Hasta aki estamos bien");
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

    if (PersonaData.names === "") {
      return res.json({ status: "Debe llenar el nombre del paciente" });
    } else if (PersonaData.dni === "") {
      return res.json({ status: "Debe llenar la cédula del paciente" });
    } else if (PersonaData.direction === "") {
      return res.json({ status: "Debe llenar la dirección del paciente" });
    } else if (PersonaData.dateBorn === "") {
      return res.json({
        status: "Debe llenar la fecha de nacimiento del paciente",
      });
    } else if (PersonaData.phone === "") {
      return res.json({ status: "Debe llenar el telefono del paciente" });
    }

    if (!dniValidate(PersonaData.dni)) {
      return res.json({ status: "Vérifique el numero de cédula" });
    }

    const patient = new PatientModel(PersonaData);
    const patientTmp = await PatientModel.findOne({ dni: PersonaData.dni });
    if (patientTmp)
      return res.json({
        status: `El paciente con el numero de cedula ${PersonaData.dni} ya se encuentra registrado`,
      });
    let patient_id = -1;
    await patient.save().then((pt) => {
      patient_id = String(pt._id);
    });
    if (patient_id === -1)
      throw new Error(
        "Error fatal - no se ha guardado correctamente el paciente"
      );

    PersonalHistory.patient = patient_id;
    const personalhistory = new PersonalHistoryModel(PersonalHistory);
    await personalhistory.save();

    if (OralSymp) {
      OralSymp.patient = patient_id;
      const oralSymp = new OralSympModel(OralSymp);
      await oralSymp.save();
    }

    if (Odontogram) {
      Odontogram.patient = patient.id;
      const odontogram = new OdontogramModel(Odontogram);
      await odontogram.save();
    }

    if (ClinicalSygns) {
      ClinicalSygns.patient = patient_id;
      const clinicalSigns = new ClinicalSygnsModel(ClinicalSygns);
      await clinicalSigns.save();
    }

    if (Treatments) {
      Treatments.patient = patient_id;
      const treatments = new TreatmentModel(Treatments);
      await treatments.save();
    }

    if (WayPay) {
      WayPay.patient = patient_id;
      const wayPay = new WayPayModel(WayPay);
      await wayPay.save();
    }

    res.json({ status: "ok" });
  } catch (error) {
    let response = { status: "Error" };
    switch (error.code) {
      case 11000:
        response.status = "Este paciente ya está registrado";
        break;

      default:
        response.status =
          "Ha ocurrido un error en el servidor al guardar el nuevo paciente";
        break;
    }
    console.log(error);

    res.json(response);
  }
};

module.exports = patientsCtrl;
