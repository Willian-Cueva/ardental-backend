const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const AccountSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

AccountSchema.pre("save", function (next) {
  bcrypt
    .genSalt(10)
    .then((salts) => {
      bcrypt
        .hash(this.password, salts)
        .then((hash) => {
          this.password = hash;
          next();
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

module.exports = mongoose.model("Account", AccountSchema);
