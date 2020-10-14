// MODULE
const express = require("express");
const bodyParser = require("body-parser");

// INTERNAL MODULE
const firebaseAuth = require("./Firebase/FirebaseAuth");
const authRouter = require("./Auth/AuthRouter");

// VARIABLE
const app = express();
const port = process.env.PORT || 8000;
const ip = process.env.IP || "0.0.0.0";
// LOGIC
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/auth", authRouter);

app.listen(port, ip, () => {
  console.log(`server is starting in ${ip}:${port}`);
});
