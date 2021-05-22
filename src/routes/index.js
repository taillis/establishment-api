const express = require("express");
const routes = express.Router();

const establishment = require("./establishment");
const login = require("./login");

//Initial route
routes.get("/", (req, res) => {
  res.status(200).send({
    message: "The service is online!",
    version: "1.0.0",
  });
});

//Establishment route
routes.use("/establishment", establishment);

//Auth route
routes.use("/auth", login);

module.exports = routes;
