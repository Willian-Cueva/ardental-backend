const mongoose = require("mongoose");
const { Schema } = mongoose;

const MedicalAppointmentSchema = new Schema({
  dniPatient: {
    type: String,
    required: true,
  },
  namesPatient:{
    type: String,
    required: true,
  },
  date: {
    day: {
      type: String,
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
  },
  timeStart: {
    type: String,
    required: true,
  },
  observations: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Valor predeterminado: la fecha y hora actual
  }
});

module.exports = mongoose.model("MedicalAppointment", MedicalAppointmentSchema);
