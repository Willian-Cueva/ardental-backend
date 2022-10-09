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
    required: true,
  },
  direction: {
    type: String,
    required: true,
  },
  maritalStatus: {
    type: Number,
    required: true,
    max: 5,
    min: 1,
  },
  sex: {
    type: Number,
    max: 3,
    min: 1,
    required: true,
  },
  dateBorn: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Patient", PatientSchema);
