const mongoose = require("mongoose");
const { Schema } = mongoose;

const ClinicalSignsSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
  },
  lips: {
    clinicalSigns: {
      type: String,
      required: false,
    },
    observations: {
      type: String,
      required: false,
    },
  },
  cheeks: {
    clinicalSigns: {
      type: String,
      required: false,
    },
    observations: {
      type: String,
      required: false,
    },
  },
  floorMouth: {
    clinicalSigns: {
      type: String,
      required: false,
    },
    observations: {
      type: String,
      required: false,
    },
  },
  tongue: {
    clinicalSigns: {
      type: String,
      required: false,
    },
    observations: {
      type: String,
      required: false,
    },
  },
  saliva: {
    clinicalSigns: {
      type: String,
      required: false,
    },
    observations: {
      type: String,
      required: false,
    },
  },
  gums: {
    clinicalSigns: {
      type: String,
      required: false,
    },
    observations: {
      type: String,
      required: false,
    },
  },
  tonsils: {
    clinicalSigns: {
      type: String,
      required: false,
    },
    observations: {
      type: String,
      required: false,
    },
  },
  ATM: {
    clinicalSigns: {
      type: String,
      required: false,
    },
    observations: {
      type: String,
      required: false,
    },
  },
  nodes: {
    clinicalSigns: {
      type: String,
      required: false,
    },
    observations: {
      type: String,
      required: false,
    },
  },
  salivaryGlands: {
    clinicalSigns: {
      type: String,
      required: false,
    },
    observations: {
      type: String,
      required: false,
    },
  },
});

module.exports = mongoose.model("ClinicalSigns", ClinicalSignsSchema);
