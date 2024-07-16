const patientsCtrl = {};
const PatientModel = require("../models/patient");
const PersonalHistoryModel = require("../models/personalhistory");
const OralSympModel = require("../models/oralSymp");
const OdontogramModel = require("../models/odontogram");
const ClinicalSygnsModel = require("../models/clinicalSigns");
const TreatmentModel = require("../models/treatment");
const WayPayModel = require("../models/wayPay");
const ImagenModel = require("../models/images");
const TreatmentAndPayModel = require("../models/treatmentAndPay");
const MedicalAppointmentModel = require("../models/medicalAppointment");
const { dniValidate } = require("../helpers/validations");
const UserModel = require("../models/user");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dm3gntcte",
  api_key: "944791171699979",
  api_secret: "4zaR7n-xm-FfKQ6LhvwpC7uHfuI",
});

patientsCtrl.getMedicalAppointmentState = async (req, res) => {
  try {
    const { state } = req.params;
    let search = "";
    switch (state) {
      case "pendings":
        search = "PENDIENTE";
        break;
      case "unpresented":
        search = "NO SE PRESENTO";
        break;
      case "presented":
        search = "SE PRESENTO";
        break;
      default:
        search = "";
        break;
    }
    console.log("Buscando: ", search);
    const medicalAppointment = await MedicalAppointmentModel.find({
      state: search,
    });
    return res.json({ status: "ok", data: medicalAppointment });
  } catch (error) {
    console.log(error);
    return res.json({ status: "Ocurrio un error al traer las citas medicas" });
  }
};

patientsCtrl.putMedicalAppointment = async (req, res) => {
  try {
    const { updateMedicalAppointment } = req.body;
    const _id = updateMedicalAppointment._id;
    const medicalAppointment = await MedicalAppointmentModel.findById(_id);
    medicalAppointment.namesPatient = updateMedicalAppointment.namesPatient;
    medicalAppointment.dniPatient = updateMedicalAppointment.dniPatient;
    medicalAppointment.date.year = updateMedicalAppointment.date.year;
    medicalAppointment.date.month = updateMedicalAppointment.date.month;
    medicalAppointment.date.day = updateMedicalAppointment.date.day;
    medicalAppointment.timeStart = updateMedicalAppointment.timeStart;
    medicalAppointment.observations = updateMedicalAppointment.observations;
    await medicalAppointment.save();
    return res.json({ status: "ok", data: medicalAppointment });
  } catch (error) {
    console.log(error);
    return res.json({ status: "Ocurrio un error al actualizar la cita médica" });
  }
};

patientsCtrl.patchMedicalAppointmentState = async (req, res) => {
  try {
    const { _id, state } = req.body;
    const medicalAppointment = await MedicalAppointmentModel.findById(_id);
    medicalAppointment.state = state;
    await medicalAppointment.save();
    console.log(medicalAppointment);
    return res.json({ status: "ok", data: medicalAppointment });
  } catch (error) {
    console.log(error);
    return res.json({ status: "Ocurrio un error cambiar el estado de la cita" });
  }
};

patientsCtrl.getMedicalAppointmentPerYearMonthAndDay = async (req, res) => {
  try {
    const { year, month, day } = req.params;

    const medicalAppointments = await MedicalAppointmentModel.find({
      $and: [
        { "date.year": year }, // Ajusta el año según el que desees buscar
        { "date.month": month * 1 }, // Ajusta el mes según el que desees buscar (agrega un cero si es necesario)
        { "date.day": day * 1 < 10 ? `0${day}` : day }, // Ajusta el día según el que desees buscar (agrega un cero si es necesario)
      ],
    }).sort({ timeStart: 1 });
    console.log(medicalAppointments);
    return res.json({ status: "ok", data: medicalAppointments });
  } catch (error) {
    console.log(error);
    return res.json({ status: "Ocurrio un error al traer las citas medicas" });
  }
};

patientsCtrl.getMedicalAppointmentPerYearAndMonth = async (req, res) => {
  try {
    const { year, month } = req.params;
    console.log(year, month);
    const listDaysMonth = [];
    const daysMonth = new Date(year * 1, month * 1 + 1, 0).getDate();
    console.log(daysMonth);

    for (let i = 1; i <= daysMonth; i++) {
      listDaysMonth.push({ day: i, appointments: 0 });
    }

    const medicalAppointments = await MedicalAppointmentModel.find({
      $and: [
        { "date.year": year }, // Ajusta el año según el que desees buscar
        { "date.month": month },
      ],
    });

    medicalAppointments.forEach((medicalAppointment) => {
      listDaysMonth[medicalAppointment.date.day - 1].appointments++;
    });

    const firstDayMonth = new Date(year, month, 1).getDay();

    const data = {
      firstDayMonth,
      listDaysMonth,
    };

    return res.json({ status: "ok", data });
  } catch (error) {
    console.log(error);
    return res.json({ status: "Ocurrio un error al traer las citas medicas" });
  }
};

patientsCtrl.updateVersion = async (req, res) => {
  try {
    const users = await UserModel.find();
    users.forEach(async (user) => {
      switch (user.sex) {
        case "1":
          user.sex = "Masculino";
          break;
        case "2":
          user.sex = "Femenino";
          break;
        case "3":
          user.sex = "Otro";
          break;
        default:
          break;
      }
      await user.save();
    });

    const patients = await PatientModel.find();
    patients.forEach(async (patient) => {
      switch (patient.sex) {
        case "1":
          patient.sex = "Masculino";
          break;
        case "2":
          patient.sex = "Femenino";
          break;
        case "3":
          patient.sex = "Otro";
          break;
        default:
          break;
      }
      switch (patient.maritalStatus) {
        case "1":
          patient.maritalStatus = "Soltero/a";
          break;
        case "2":
          patient.maritalStatus = "Casado/a";
          break;
        case "3":
          patient.maritalStatus = "Divorciado/a";
          break;
        case "4":
          patient.maritalStatus = "Viudo/a";
          break;
        default:
          break;
      }
      patient.version = 1;
      await patient.save();
    });

    const personalhistories = await PersonalHistoryModel.find();
    personalhistories.forEach(async (personalhistory) => {
      switch (personalhistory.bloodPressure) {
        case 1:
          personalhistory.bloodPressure = "Alta";
          break;
        case 2:
          personalhistory.bloodPressure = "Normal";
          break;
        case 3:
          personalhistory.bloodPressure = "Baja";
          break;
        default:
          break;
      }
      await personalhistory.save();
    });

    return res.json({ status: "ok", message: "version actualizada" });
  } catch (error) {
    console.log(error);
    return res.json({ status: "Ocurrio un error al actualizar la version" });
  }
};

patientsCtrl.deleteMedicalAppointment = async (req, res) => {
  try {
    const { _id } = req.body;
    await MedicalAppointmentModel.findByIdAndDelete(_id);
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    return res.json({ status: "Ocurrió un error al eliminar la cita medica" });
  }
};

patientsCtrl.getMedicalAppointments = async (req, res) => {
  try {
    const { dniPatient } = req.params;
    const medicalAppointments = await MedicalAppointmentModel.find(dniPatient);
    return res.json({ status: "ok", data: medicalAppointments });
  } catch (error) {
    console.log(error);
    return res.json({ status: "Ocurrio un error al traer las citas medicas" });
  }
};

patientsCtrl.postMedicalAppointment = async (req, res) => {
  try {
    const { medicalAppointment } = req.body;
    const newMedicalAppointment = new MedicalAppointmentModel(
      medicalAppointment
    );
    await newMedicalAppointment.save();
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    return res.json({ status: "Ocurrio un error al crear la cita medica" });
  }
};
patientsCtrl.deleteTreatmentAndPay = async (req, res) => {
  try {
    const { _id } = req.params;
    await TreatmentAndPayModel.findByIdAndDelete(_id);
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "Ocurrio un error al eliminar el tratamiento y pago",
    });
  }
};

patientsCtrl.putTreatmentsAndPay = async (req, res) => {
  try {
    const { data } = req.body;
    console.log("datos a actualizar");
    console.log(data);
    const TreatmentAndPay = await TreatmentAndPayModel.findOne({
      _id: data._id,
    });
    console.log("tratamiento y pago encontrado");
    console.log(TreatmentAndPay);
    const { dateInit, dateEnd, treatment, values, followUp } = data;
    TreatmentAndPay.dateInit = dateInit;
    TreatmentAndPay.dateEnd = dateEnd;
    TreatmentAndPay.treatment = treatment;
    TreatmentAndPay.values = values;
    TreatmentAndPay.followUp = followUp;
    const save = await TreatmentAndPay.save();
    console.log("Lo guardado dice que es");
    console.log(save);
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "Ocurrio un error al actualizar el tratamiento y pago",
    });
  }
};

patientsCtrl.getTreatmentAndPay = async (req, res) => {
  try {
    const { dniPatient } = req.params;
    const treatmentAndPay = await TreatmentAndPayModel.find({ dniPatient });
    return res.json({ status: "ok", data: treatmentAndPay });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "Ocurrio un error al obtener los tratamientos y pagos",
    });
  }
};

patientsCtrl.postTreatmentAndPay = async (req, res) => {
  try {
    const { treatmentAndPay } = req.body;
    const TreatmentAndPay = new TreatmentAndPayModel(treatmentAndPay);
    await TreatmentAndPay.save();
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "Ocurrio un error al crear el tratamiento y pago",
    });
  }
};

patientsCtrl.deleteImage = async (req, res) => {
  try {
    const { url } = req.body;
    const image = await ImagenModel.findOne({ url });
    await image.delete();
    return res.json({
      status: "ok",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "Ha ocurrido un error al eliminar la imagen del paciente",
    });
  }
};

patientsCtrl.getImagesPatient = async (req, res) => {
  try {
    const { dni } = req.params;
    const patient = await PatientModel.findOne({ dni });
    if (patient) {
      const images = await ImagenModel.find({ user: patient._id }).lean();
      return res.json({ status: "ok", data: images });
    } else {
      return res.json({
        status: "No se pudo encontrar el paciente para subir las imágenes",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: "Ha ocurrido un error al traer las imagenes del paciente",
    });
  }
};

patientsCtrl.uploadImage = async (req, res) => {
  try {
    const { dni } = req.body;
    const patient = await PatientModel.findOne({ dni });
    if (patient) {
      const imageUploadeada = await cloudinary.uploader.upload(req.file.path);
      const imagen = new ImagenModel({
        user: String(patient._id),
        url: imageUploadeada.url,
      });
      await imagen.save();
      return res.json({ status: "ok" });
    } else {
      return res.json({
        status: "No se pudo encontrar el paciente para subir las imágenes",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: "Ocurrio un problema al subir la imagen",
    });
  }
};

patientsCtrl.putWayPayPatient = async (req, res) => {
  try {
    const { data, _id } = req.body;
    const waypay = await WayPayModel.findOne({ patient: _id });
    waypay.data = data;

    await waypay.save();
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    return res.json({
      status:
        "Ocurrió un error en el backend al actualizar el la forma de pago del paciente",
    });
  }
};

patientsCtrl.getWayPayPatient = async (req, res) => {
  try {
    const { _id } = req.params;
    const data = await WayPayModel.findOne({ patient: _id });
    return res.json({ status: "ok", data: data });
  } catch (error) {
    console.log(error);
    return res.json({
      status:
        "Ha ocurrido un error al traer la información de las formas de pago del paciente",
    });
  }
};

patientsCtrl.putTreatmentsPatient = async (req, res) => {
  try {
    const { data, _id } = req.body;
    const treatments = await TreatmentModel.findOne({ patient: _id });
    treatments.data = data;

    await treatments.save();
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    return res.json({
      status:
        "Ocurrió un error en el backend al actualizar el odontograma del paciente",
    });
  }
};

patientsCtrl.getTreatmentsPatient = async (req, res) => {
  try {
    const { _id } = req.params;
    const data = await TreatmentModel.findOne({ patient: _id });
    return res.json({ status: "ok", data: data.data });
  } catch (error) {
    console.log(error);
    return res.json({
      status:
        "Ha ocurrido un error al traer la información del plan y seguimiento de tratamiento del paciente",
    });
  }
};

patientsCtrl.putClinicalSignsPatient = async (req, res) => {
  try {
    const {
      lips,
      cheeks,
      floorMouth,
      tongue,
      saliva,
      gums,
      tonsils,
      ATM,
      nodes,
      salivaryGlands,
      _id,
    } = req.body;
    const clinicalSigns = await ClinicalSygnsModel.findOne({ patient: _id });
    clinicalSigns.lips = lips;
    clinicalSigns.cheeks = cheeks;
    clinicalSigns.floorMouth = floorMouth;
    clinicalSigns.tongue = tongue;
    clinicalSigns.saliva = saliva;
    clinicalSigns.gums = gums;
    clinicalSigns.tonsils = tonsils;
    clinicalSigns.ATM = ATM;
    clinicalSigns.nodes = nodes;
    clinicalSigns.salivaryGlands = salivaryGlands;
    await clinicalSigns.save();
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    return res.json({
      status:
        "Ocurrió un error en el backend al actualizar el odontograma del paciente",
    });
  }
};

patientsCtrl.getClinicalSignsPatient = async (req, res) => {
  try {
    const { _id } = req.params;
    const data = await ClinicalSygnsModel.findOne({ patient: _id });
    return res.json({ status: "ok", data });
  } catch (error) {
    console.log(error);
    return res.json({
      status:
        "Ha ocurrido un error al traer la información de los signos clínicos del paciente",
    });
  }
};

patientsCtrl.putOdontogramPatient = async (req, res) => {
  try {
    const { data, _id } = req.body;
    const odontogram = await OdontogramModel.findOne({ patient: _id });
    odontogram.data = data;
    await odontogram.save();
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    return res.json({
      status:
        "Ocurrió un error en el backend al actualizar el odontograma del paciente",
    });
  }
};

patientsCtrl.getOdontogramPatient = async (req, res) => {
  try {
    const { _id } = req.params;
    const data = await OdontogramModel.findOne({ patient: _id });
    return res.json({ status: "ok", data });
  } catch (error) {
    console.log(error);
    return res.json({
      status:
        "Ha ocurrido un error al traer la información del odontograma del paciente",
    });
  }
};

patientsCtrl.putOralSympPatient = async (req, res) => {
  try {
    const {
      halitosis,
      BleedingGums,
      xerostomia,
      bruxismo,
      hypersensitivity,
      _id,
    } = req.body;
    const oralSymp = await OralSympModel.findOne({ patient: _id });
    oralSymp.halitosis = halitosis;
    oralSymp.BleedingGums = BleedingGums;
    oralSymp.xerostomia = xerostomia;
    oralSymp.bruxismo = bruxismo;
    oralSymp.hypersensitivity.acid = hypersensitivity.acid;
    oralSymp.hypersensitivity.cool = hypersensitivity.cool;
    oralSymp.hypersensitivity.hot = hypersensitivity.hot;
    oralSymp.hypersensitivity.sweet = hypersensitivity.sweet;
    oralSymp.hypersensitivity.touch = hypersensitivity.touch;
    await oralSymp.save();
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    return res.json({
      status:
        "Ocurrió un error en el backend al actualizar la sintomatología oral del paciente",
    });
  }
};

patientsCtrl.getOralSympPatient = async (req, res) => {
  try {
    const { _id } = req.params;
    const data = await OralSympModel.findOne({ patient: _id });
    return res.json({ status: "ok", data });
  } catch (error) {
    console.log(error);
    return res.json({
      status:
        "Ha ocurrido un error al traer la información de la sintomatología oral del paciente",
    });
  }
};

patientsCtrl.putPersonalHistoryPatient = async (req, res) => {
  try {
    const {
      disorders,
      bloodPressure,
      heartDiseases,
      medication,
      otherDiseases,
      _id,
    } = req.body;
    const personalhistory = await PersonalHistoryModel.findOne({
      patient: _id,
    });
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
        "Ocurrió un error en el backend al actualizar los antecedentes personales del paciente",
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
        "Ha ocurrido un error al traer la información de los antecedentes personales del paciente",
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
    patient.maritalStatus = maritalStatus;
    patient.sex = sex;
    patient.dateBorn = dateBorn;
    patient.reason = reason;
    await patient.save();
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    return res.json({
      status:
        "Ocurrió un error en el backend al actualizar los datos personales del paciente",
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
