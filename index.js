require("dotenv").config();
var config = require("./config/config.json");
var proxy = require("redbird")({ port: process.env.PORT || config.PORT });
var domain = process.env.DOMAIN || config.DOMAIN;
var userservice = process.env.USERSERVICE || config.USERSERVICE;
var iplocation = process.env.IPLOCATIONSERVICE || config.IPLOCATIONSERVICE;
var weatherservice = process.env.WEATHERSERVICE || config.WEATHERSERVICE;
var taskservice = process.env.TASKSERVICE || config.TASKSERVICE;
var geoservice = process.env.GEOSERVICE || config.GEOSERVICE;
var frontend = process.env.FRONTSERVICE || config.FRONTSERVICE;
// LOGIN
proxy.register(domain + "/api/login", userservice + "/api/login");
proxy.register(domain + "/api/users", userservice + "/api/users");

// IP SERVICE
proxy.register(domain + "/api/ip-location", iplocation + "/api/ip-location");

// WEATHERSERVICE
proxy.register(domain + "/api/weather", weatherservice + "/api/weather");

// TASKSERVICE
proxy.register(domain + "/api/tasks", taskservice + "/api/tasks");

//GEOSERVICE
proxy.register(domain + "/api/geocoding", geoservice + "/api/geocoding");

// FRONTEND
proxy.register(domain, frontend);
