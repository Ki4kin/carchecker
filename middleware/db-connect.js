const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()


const origin =
  "mongodb+srv://Kirill:<password>@carchecker.8boxh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectionAdress = process.env.DB;

mongoose.connect(connectionAdress, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


module.exports = mongoose.connection;

