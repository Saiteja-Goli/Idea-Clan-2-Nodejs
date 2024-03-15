const express = require('express');
require('dotenv').config();
const authRoutes=require("./src/routes/userRoutes")

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log("Method:", req.method, req.url);
    next();
  });
  // Routes
  app.get("/", (req, res) => {
    res.send("WELCOME TO SERVER...!");
  });  
// Applying verifyToken middleware to routes that require authentication
app.use('/', authRoutes);

// Server listening
app.listen(process.env.PORT || 8090, async () => {
    try {
        await authRoutes.connect;
        console.log("connected to db");
        console.log("Listining on port 9000");
    } catch (error) {
        console.log("Error:", error);
    }
});