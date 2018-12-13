require("dotenv").config();
var config = require("./config/config.json");
var proxy = require("redbird")({ port: process.env.PORT || config.PORT });
config.routes.map(route => {
  proxy.register(
    process.env.DOMAIN || config.DOMAIN + route.from,
    process.env[route.DOMAIN] || config[route.DOMAIN] + route.to
  );
});
