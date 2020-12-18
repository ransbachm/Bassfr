const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();


app.use(cors());
app.use(express.json());

const uri = process.env.atlas_uri;
const port = process.env.port;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully")
})


const exerciseRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exerciseRouter);
app.use("/users", usersRouter);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});