const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const cors = require("cors");
// const bodyParser = require("body-parser");

require("./database");
//Configuraciones
app.set("port", process.env.PORT || 3001);
app.use(cors());
app.use((req, res, next) => {
  res.header({
    "Access-Control-Allow-Origin": "*",
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: true,
    optionsSuccessStatus: 204,
  });
  next();
});

//Middlewares
app.use(morgan("dev"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//Routes 
app.use("/api/patients", require("./routes/patients.routes"));
// app.use("/api/users", require("./routes/users.routes"));
// app.use("/api/treatments", require("./routes/treatments.routes"));
// app.use("/api/products", require("./routes/products.routes"));
// app.use("/api/cart", require("./routes/cart.routes"))
// app.use("/api/administer", require("./routes/administer.routes"))
//Static files
// app.use(express.static(path.join(__dirname, "client/build")));

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Servidor Ejecutandoce en el puerto ${app.get("port")}`);
});
