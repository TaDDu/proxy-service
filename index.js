require("dotenv").config();
var config = require("./config/config.json");
var proxy = require("redbird")({ port: process.env.PORT || config.PORT });

// LOGIN
proxy.register(
  process.env.DOMAIN + "/api/login" || config.DOMAIN + "/api/login",
  process.env.USERSERVICE + "/api/login" || config.USERSERVICE + "/api/login"
);
proxy.register(
  process.env.DOMAIN + "/api/users" || config.DOMAIN + "/api/users",
  process.env.USERSERVICE + "/api/users" || config.USERSERVICE + "/api/users"
);

// IP SERVICE
proxy.register(
  process.env.DOMAIN + "/api/ip-location" || config.DOMAIN + "/api/ip-location",
  process.env.IPLOCATIONSERVICE + "/api/ip-location" ||
    config.IPLOCATIONSERVICE + "/api/ip-locationn"
);

// FRONTEND
proxy.register(
  process.env.DOMAIN || config.DOMAIN,
  process.env.FRONTSERVICE || config.FRONTSERVICE + ":8080"
);
proxy.register(
  process.env.DOMAIN + "/a" || config.DOMAIN + "/a",
  process.env.FRONTSERVICE || config.FRONTSERVICE + ":8080"
);
