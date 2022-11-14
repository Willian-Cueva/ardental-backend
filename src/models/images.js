const mongoose = require("mongoose");
const { Schema } = mongoose;

const ImagesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
  },
  url: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("Images", ImagesSchema);
