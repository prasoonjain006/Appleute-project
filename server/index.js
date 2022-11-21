const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const port = process.env.PORT || 5000;

const cors = require('cors')

app.use(cors()) 

console.log("A");
console.log(process.env.MONGODB_STRING);
mongoose
  .connect(process.env.MONGODB_STRING)
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
  });

app.use(require("morgan")("dev"));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// routes
require("./models/user");
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

app.use(require("./routes/order.routes"));
app.use(require("./routes/product.routes"));
app.use(require("./routes/cart.routes"));
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
