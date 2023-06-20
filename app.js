const dotenv = require("dotenv");
const database = require("./database");
dotenv.config();
database();

const express = require("express");

const app = express();
const accountsRoutes = require("./api/accounts/accounts.routes");

app.use(express.json());
app.use("/accounts", accountsRoutes);

app.listen(process.env.PORT, () => {
  console.log("The application is running on localhost:8080");
});
