const mongoose = require("mongoose");
const { Schema } = mongoose;

const PatientSchema = new Schema({
  names: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: false,
  },
  dni: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  direction: {
    type: String,
    required: true,
  },
  maritalStatus: {
    type: String,
    required: false,
  },
  sex: {
    type: String,
    required: false,
  },
  dateBorn: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
  },
  version: {
    type: Number,
    required: false,
    default: 2,
  },
});

module.exports = mongoose.model("Patient", PatientSchema);
