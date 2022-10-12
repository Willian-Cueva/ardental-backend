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
    type: Number,
    required: false,
    max: 5,
    min: 1,
  },
  sex: {
    type: Number,
    max: 3,
    min: 1,
    required: false,
  },
  dateBorn: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
  },
});

module.exports = mongoose.model("Patient", PatientSchema);
