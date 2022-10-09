const mongoose = require("mongoose");
const { Schema } = mongoose;

const OralSympSchema = new Schema({
  patient: 
    {
      type: Schema.Types.ObjectId,
      ref: "Patient",
    },
  halitosis: Boolean,
  BleedingGums: Boolean,
  xerostomia: Boolean,
  bruxismo: Boolean,
  hypersensitivity: {
    cool: Boolean,
    hot: Boolean,
    sweet: Boolean,
    acid: Boolean,
    touch: Boolean,
  },
});

module.exports = mongoose.model("OralSymp", OralSympSchema);
