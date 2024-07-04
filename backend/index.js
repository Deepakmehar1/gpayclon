const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT;
const MONGOURI = process.env.MONGOURI;
app.use(cors());
mongoose.connect(MONGOURI);

mongoose.connection.on("connected", () => console.log("ohhh yehhh"));
mongoose.connection.on("error", (err) => console.log("err connecting", err));

require("./model/user");
require("./model/transection");

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/user"));

app.listen(PORT, () => console.log("server is running on", PORT));
