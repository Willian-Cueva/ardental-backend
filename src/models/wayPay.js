const mongoose = require("mongoose");
const { Schema } = mongoose;

const WayPaySchema = new Schema({
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
        pass:{
            type: Number,
            min: 0,
            required: true,
        },
        balance: {
            type: Number,
            min: 0,
            required: false,
        },
        observations:{
            type: String,
            required: false,
        }
    }
  ],
  
});

module.exports = mongoose.model("WayPay", WayPaySchema);
