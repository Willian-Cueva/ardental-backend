const mongoose = require("mongoose");

// const URI = "mongodb://localhost:27017/ardental-back";

const URI = "mongodb+srv://ardental:P2qffF2MnavSrZCb@cluster0.qjqtf.mongodb.net/ardental-back?retryWrites=true&w=majority";

// P2qffF2MnavSrZCb

mongoose
  .connect(URI)
  .then((db) => console.log("La base de datos está conectada" + db))
  .catch((error) => console.log("No se pudo conectar la base de datos", error));

module.exports = mongoose;
