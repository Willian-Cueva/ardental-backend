const mongoose = require("mongoose");

// const URI = "mongodb://127.0.0.1:27017/ardental-back";
// const URI = "mongodb+srv://ardental:AY1J8P3OKQ3pjGdm@cluster0.p1swo.mongodb.net/ardental-back?retryWrites=true&w=majority";
const URI = "mongodb+srv://enriquewillian2:E7KSyUeC66tjLZ7i@cluster0.egosslt.mongodb.net/";

// AY1J8P3OKQ3pjGdm

mongoose
  .connect(URI)
  .then((db) => console.log("La base de datos está conectada" + db))
  .catch((error) => console.log("No se pudo conectar la base de datos", error));

module.exports = mongoose;
