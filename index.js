require("dotenv").config();
var config = require("./config/config.json");
//var proxy = require("redbird")({ port: process.env.PORT || config.PORT });

var proxy = require("redbird")({
  port: process.env.PORT || config.PORT, // http port is needed for LetsEncrypt challenge during request / renewal. Also enables automatic http->https redirection for registered https routes.
  letsencrypt: {
    path: __dirname + "/certs",
    port: 9999 // LetsEncrypt minimal web server port for handling challenges. Routed 80->9999, no need to open 9999 in firewall. Default 3000 if not defined.
  },
  ssl: {
    http2: true,
    port: 443 // SSL port used to serve registered https routes with LetsEncrypt certificate.
  }
});

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
proxy.register(domain, frontend, {
  ssl: {
    letsencrypt: {
      email: process.env.EMAIL || "", // Domain owner/admin email
      production: process.env.PRO || false // WARNING: Only use this flag when the proxy is verified to work correctly to avoid being banned!
    }
  }
});
