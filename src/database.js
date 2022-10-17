const mongoose = require("mongoose");

// const URI = "mongodb://localhost:27017/ardental-back";
const URI = "mongodb+srv://ardental:AY1J8P3OKQ3pjGdm@cluster0.p1swo.mongodb.net/ardental-back?retryWrites=true&w=majority";
// const URI = "mongodb+srv://ardental:AY1J8P3OKQ3pjGdm@cluster0.qjqtf.mongodb.net/ardental-back?retryWrites=true&w=majority";

// AY1J8P3OKQ3pjGdm

mongoose
  .connect(URI)
  .then((db) => console.log("La base de datos está conectada" + db))
  .catch((error) => console.log("No se pudo conectar la base de datos", error));

module.exports = mongoose;
