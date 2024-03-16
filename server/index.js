const express = require('express');
require('dotenv').config();
const authRoutes = require("./src/routes/userRoutes");
const { connection } = require("./src/configs/db");

const app = express();

app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("WELCOME TO SERVER...!");
});

app.use('/', authRoutes);

// Server listening
app.listen(process.env.PORT || 8090, async () => {
  try {
    await connection;
    console.log("connected to db");
    console.log(`Listining on port ${process.env.PORT}`);
  } catch (error) {
    console.log("Error:", error);
  }
});