const mongoose = require("mongoose");
const { Schema } = mongoose;

const PersonalHistorySchema = new Schema({
  patient: 
    {
      type: Schema.Types.ObjectId,
      ref: "Patient",
    },
  disorders: {
    type: String,
    required: false,
  },
  bloodPressure: {
    type: Number,
    required: true,
    max: 3,
    min: 1
  },
  heartDiseases: {
    type: Boolean,
    required: true,
  },
  medication: {
    type: String,
    required: false,
  },
  otherDiseases: {
    type: String,
    required: false,
  },
  reasonConsult: {
    type: String,
    required: false,
  }
});

module.exports = mongoose.model("PersonalHistory", PersonalHistorySchema);
