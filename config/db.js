const dotenv = require("dotenv")
dotenv.config()
const mongoose = require("mongoose");

const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.dmnku.mongodb.net/qui_db?retryWrites=true&w=majority`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(connectionString, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

require("../models/Question");