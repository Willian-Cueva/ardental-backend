const mongoose = require("mongoose");
const { Schema } = mongoose;

const TreatmentSchema = new Schema({
  patient: 
    {
      type: Schema.Types.ObjectId,
      ref: "Patient",
    },
  data: [
    {
        date: {
            type: String,
            required: true,
        },
        part:{
            type: String,
            required: true,
        },
        diagnostic: {
            type: String,
            required: false,
        },
        treatment:{
            type: String,
            required: false,
        }
    }
  ],
  
});

module.exports = mongoose.model("Treatment", TreatmentSchema);
