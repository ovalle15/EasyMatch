const jwt = require("jsonwebtoken");
const config = require("config");


module.exports = function(req, res, next) {
  //get the token from the header if present
  console.log("This is req", req);
  console.log("This is res", res);
  console.log("This auth.js this the req =====>", req);
  const token = req.headers["x-access-token"] || req.headers["authorization"];
  console.log("This is req", req.headers);
  console.log("This is res", res.headers);

  console.log("token, called when retrieved (GET) ====>", token)
  //if no token found, return response (without going to the next middelware)
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    //if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, config.get("myprivatekey"));
    req.user = decoded;
    next();
  } catch (ex) {
    //if invalid token
    res.status(400).send("Invalid token.");
  }
};

