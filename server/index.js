const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

// Routers

const reservations = require("./requests/reservations");
const personel = require("./requests/personel");
const patients = require("./requests/patient");
const messages = require("./requests/messages");
const login = require('./requests/login');

// Middleware

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
 

app.use("/reservations", reservations);
app.use("/personel", personel);
app.use("/patient", patients);
app.use("/messages", messages);
app.use("/login", login);

// Static folder
//app.use(express.static(__dirname + "/public/"));
// SPA
//app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
//

const port = process.env.port || 5000;
app.listen(port, () => console.log("app running on port 5000"));
