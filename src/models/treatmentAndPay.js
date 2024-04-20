const mongoose = require("mongoose");
const { Schema } = mongoose;

const TreatmentAndPaySchema = new Schema({
  dniPatient: {
    type: String,
    required: true,
  },
  dateInit: {
    type: String,
    required: false,
  },
  dateEnd: {
    type: String,
    required: false,
  },
  treatment: {
    type: String,
    required: false,
  },
  values: [
    {
      name: {
        type: String,
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
      observations: {
        type: String,
        required: false,
      },
      date: {
        type: String,
        required: true,
      },
    },
  ],
  followUp: [
    {
      date: {
        type: String,
        required: false,
      },
      part: {
        type: String,
        required: false,
      },
      diagnostic: {
        type: String,
        required: false,
      },
      treatment: {
        type: String,
        required: false,
      },
      payment: {
        type: Number,
        required: false,
      },
      wayPay: {
        type: String,
        required: false,
      },
    },
  ],
});

module.exports = mongoose.model("TreatmentAndPay", TreatmentAndPaySchema);
