const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const cors = require("cors");

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
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//Routes 
app.use("/api/patients", require("./routes/patients.routes"));
app.use("/api/users", require("./routes/users.routes"));
//Static files
app.use(express.static(path.join(__dirname, "client/build")));

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Servidor Ejecutandoce en el puerto ${app.get("port")}`);
});
