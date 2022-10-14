const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  rol:{
    type: String,
    default: "not-authorized"
  }
});

UserSchema.pre('save',function (next) {
    bcrypt.genSalt(10).then((salts)=>{
        bcrypt.hash(this.password,salts).then((hash)=>{
            this.password = hash;
            next();
        }).catch(err=>console.log(err))
    }).catch(err=>console.log(err))
})

module.exports = mongoose.model("User", UserSchema);
