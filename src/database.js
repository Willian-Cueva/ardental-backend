const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/ardental-back";
// const URI =
//   "mongodb+srv://flormariadb:flor190522Passp@cluster0.qjqtf.mongodb.net/flor-maria-spa?retryWrites=true&w=majority";
// const URI =
//   "mongodb+srv://flormariadb:flor190522Passp@cluster0.fbbdh.mongodb.net/flor-maria-spa?retryWrites=true&w=majority";

mongoose
  .connect(URI)
  .then((db) => console.log("La base de datos está conectada" + db))
  .catch((error) => console.log("No se pudo conectar la base de datos", error));

module.exports = mongoose;
