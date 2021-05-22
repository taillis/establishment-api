const routes = require("express").Router();
const establishmentController = require("../app/controllers/establishment");
const { authorize } = require("../app/middlewares/index");

routes.post("/register", establishmentController.new);

routes.get("/", establishmentController.list);

routes.delete("/", authorize, establishmentController.remove);

module.exports = routes;
