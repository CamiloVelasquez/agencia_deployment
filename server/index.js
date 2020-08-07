//importar express para crear el servidor
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const routes = require("./routes");
const configs = require("./config");
const db = require("./config/database");

require("dotenv").config({ path: "variables.env" });

db.authenticate()
  .then(() => console.log("DB conectada"))
  .catch((error) => console.log(error));

//configurar express
const app = express();

//habilitar pug
app.set("view engine", "pug");

//donde va encontrar los templates o vistas
app.set("views", path.join(__dirname, "./views"));

//Cargar una carpeta stática llamada public
app.use(express.static("public"));

//validar si estamos en Drrollo o en producción
const config = configs[app.get("env")];
//creamos la variable con el sitio web
app.locals.titulo = config.nombresitio;

//muestra el año actual y genera la ruta
app.use((req, res, next) => {
  const fecha = new Date();
  res.locals.fechaActual = fecha.getFullYear();
  res.locals.ruta = req.path; //nos va retornar lo que tengamos en el path
  return next(); //quiere decir que estmaos usando el middle
});

//ejecutamos el bodyParser
app.use(bodyParser.urlencoded({ extended: true }));

//cargar las rutas
app.use("/", routes()); //usamos use porque  vamos a tener tanto get como post y use acepta todos los verbos

/* puerto y host para la app */

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;

app.listen(port, host, () => {
  console.log("El servidor funcionando");
});
