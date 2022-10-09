const patientsCtrl = {};
const PatientModel = require("../models/patient");
const PersonalHistoryModel = require("../models/personalhistory");
const TEST_USER = {
  PersonaData: {
    names: "Willian Cueva",
    profession: "Ingeniero en Sistemas",
    dni: "1150579124",
    phone: "0995711578",
    direction: "Epoca, Alemania entre Suiza y Holanda",
    //en el caso del estado civil va del 1-5 soltero,casado,divorciado,viudo
    maritalStatus: 1,
    //en el caso del sexo va del 1-3 masculino,femenino,otro
    sex: 1,
    dateBorn: "2002-01-12",
    reasonConsult: "Fue por que es guapisimo",
  },
  PersonalHistory: {
    disorders: "ninguno",
    //en el caso de la presion arterial va del 1-3 alta, normal , baja
    bloodPressure: 2,
    heartDiseases: false,
    medication: "ninguna",
    otherDiseases: "ninguna",
  },
  OralSymp: {
    halitosis: false,
    BleedingGums: false,
    xerostomia: false,
    bruxismo: false,
    hypersensitivity: {
      cool: false,
      hot: false,
      sweet: false,
      acid: false,
      touch: false,
    },
  },

  Odontogram: {
    18: [0, 0, 0, 0, 0, 0],
    17: [0, 0, 0, 0, 0, 0],
    16: [0, 0, 0, 0, 0, 0],
    15: [0, 0, 0, 0, 0, 0],
    14: [0, 0, 0, 0, 0, 0],
    13: [0, 0, 0, 0, 0, 0],
    12: [0, 0, 0, 0, 0, 0],
    11: [0, 0, 0, 0, 0, 0],
    55: [0, 0, 0, 0, 0, 0],
    54: [0, 0, 0, 0, 0, 0],
    53: [0, 0, 0, 0, 0, 0],
    52: [0, 0, 0, 0, 0, 0],
    51: [0, 0, 0, 0, 0, 0],
    85: [0, 0, 0, 0, 0, 0],
    84: [0, 0, 0, 0, 0, 0],
    83: [0, 0, 0, 0, 0, 0],
    82: [0, 0, 0, 0, 0, 0],
    81: [0, 0, 0, 0, 0, 0],
    48: [0, 0, 0, 0, 0, 0],
    47: [0, 0, 0, 0, 0, 0],
    46: [0, 0, 0, 0, 0, 0],
    45: [0, 0, 0, 0, 0, 0],
    44: [0, 0, 0, 0, 0, 0],
    43: [0, 0, 0, 0, 0, 0],
    42: [0, 0, 0, 0, 0, 0],
    41: [0, 0, 0, 0, 0, 0],
    21: [0, 0, 0, 0, 0, 0],
    22: [0, 0, 0, 0, 0, 0],
    23: [0, 0, 0, 0, 0, 0],
    24: [0, 0, 0, 0, 0, 0],
    25: [0, 0, 0, 0, 0, 0],
    26: [0, 0, 0, 0, 0, 0],
    27: [0, 0, 0, 0, 0, 0],
    28: [0, 0, 0, 0, 0, 0],
    61: [0, 0, 0, 0, 0, 0],
    62: [0, 0, 0, 0, 0, 0],
    63: [0, 0, 0, 0, 0, 0],
    64: [0, 0, 0, 0, 0, 0],
    65: [0, 0, 0, 0, 0, 0],
    71: [0, 0, 0, 0, 0, 0],
    72: [0, 0, 0, 0, 0, 0],
    73: [0, 0, 0, 0, 0, 0],
    74: [0, 0, 0, 0, 0, 0],
    75: [0, 0, 0, 0, 0, 0],
    31: [0, 0, 0, 0, 0, 0],
    32: [0, 0, 0, 0, 0, 0],
    33: [0, 0, 0, 0, 0, 0],
    34: [0, 0, 0, 0, 0, 0],
    35: [0, 0, 0, 0, 0, 0],
    36: [0, 0, 0, 0, 0, 0],
    37: [0, 0, 0, 0, 0, 0],
    38: [0, 0, 0, 0, 0, 0],
  },
  ClinicalSygns: {
    lips: {
      clinicalSigns: "",
      observations: "",
    },
    cheeks: {
      clinicalSigns: "",
      observations: "",
    },
    cheeks: {
      clinicalSigns: "",
      observations: "",
    },
    floorMouth: {
      clinicalSigns: "",
      observations: "",
    },
    tongue: {
      clinicalSigns: "",
      observations: "",
    },
    saliva: {
      clinicalSigns: "",
      observations: "",
    },
    gums: {
      clinicalSigns: "",
      observations: "",
    },
    tonsils: {
      clinicalSigns: "",
      observations: "",
    },
    ATM: {
      clinicalSigns: "",
      observations: "",
    },
    nodes: {
      clinicalSigns: "",
      observations: "",
    },
    salivaryGlands: {
      clinicalSigns: "",
      observations: "",
    },
  },
  Treatments: [
    {
      date: "2022-10-08",
      part: "Braket Izquierdo",
      diagnostic: "Torcido",
      treatment: "Cambiarlo o algo asi nc jejejej",
    },
    {
      date: "2022-10-09",
      part: "Braket Derecho",
      diagnostic: "REcto",
      treatment: "Cambiarlo sdfgsdfgsdf adfgadfgadfsdfgsdfgsdfgsdf",
    },
  ],
  WayPay: [
    {
      date: "",
      pass: 20,
      balance: 300,
      observations: "Es muy responsable el joven",
    },
  ],
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
    // const {names,profession,dni,phone,direction,maritalStatus,sex,dateBorn}=PersonaData;
    const patient = new PatientModel(PersonaData);
    let patient_id = 0;
    await patient.save().then(pt =>{
        patient_id = String(pt._id);
    });
    if(patient_id === 0)throw new Error("Error fatal - no se ha guardado correctamente el paciente")
    console.log(patient_id);


    res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({
      status: "Ha ocurrido un error en el servidor al guardar el nuevo paciente"
    });
  }
};

module.exports = patientsCtrl;
