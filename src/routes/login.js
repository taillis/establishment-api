const routes = require("express").Router();
const asyncHandler = require("express-async-handler");
const loginController = require("../app/controllers/login");

routes.post("/login", asyncHandler(loginController));

module.exports = routes;
