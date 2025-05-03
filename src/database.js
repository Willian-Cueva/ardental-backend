const mongoose = require("mongoose");

const URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ardental-back";

console.log(URI);

// AY1J8P3OKQ3pjGdm
mongoose.set("strictQuery", true);

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("La base de datos está conectada" + db))
  .catch((error) => console.log("No se pudo conectar la base de datos", error));

module.exports = mongoose;
