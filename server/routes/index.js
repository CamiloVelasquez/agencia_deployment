const express = require("express");
const router = express.Router();

//controladores
const nosotrosController = require("../controllers/nosotrosController");
const homeController = require("../controllers/homeController");
const viajesController = require("../controllers/viajesController");
const testimonialesController = require("../controllers/testimonialesController");

//cuando estemos en la pagina principal vamos a tener algo que se conoce como request (req) y response(res)
//app.use tambien puedo usarlo
module.exports = function () {
  router.get("/", homeController.consultasHomepage);
  router.get("/nosotros", nosotrosController.infoNosotros);
  router.get("/viajes", viajesController.mostrarViajes);
  router.get("/viajes/:id", viajesController.mostrarViaje);
  router.get("/testimoniales", testimonialesController.mostrarTestimoniales);
  //cuando se llena el formulario
  router.post("/testimoniales", testimonialesController.agregarTestimonial);
  return router;
};
