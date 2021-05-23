const routes = require("express").Router();
const establishmentController = require("../controllers/establishment");
const { authorize } = require("../middlewares/index");

routes.put("/register", establishmentController.new);

routes.get("/filter", establishmentController.list);

routes.get("/", authorize, establishmentController.get);

routes.post("/", authorize, establishmentController.update);

routes.post("/password", authorize, establishmentController.updatePassword);

routes.delete("/", authorize, establishmentController.remove);

module.exports = routes;
