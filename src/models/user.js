const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  dni: {
    type: String,
    required: true,
    unique: true,
  },
  dateBorn: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  rol:{
    type: String,
    default: "not-authorized"
  },
  changePassword:{
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("User", UserSchema);
