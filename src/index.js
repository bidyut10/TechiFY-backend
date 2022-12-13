const express = require("express");
//Express.js is a Node js web application server framework, which is specifically designed for building single-page, multi-page, and hybrid web applications.
const bodyParser = require("body-parser");
//Body parser is node.js body-parsing middleware. It is responsible for parsing the incoming bodies in a middleware before we handle it.
const route = require("./routes/route");
const { default: mongoose } = require("mongoose");
//The first step is to include the mongoose module, which is done through the require function. Once this module is in place, we can use the necessary functions available in this module to create connections to the database.
const app = express();
//Before we can start using the express module, we need to make an object of it.
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
//It is also a body-parser which returns middleware that only parses JSON.
app.use(bodyParser.urlencoded({ extended: true }));
//It is also a body-parser which returns middleware that only parses urlencoded bodies.
//that the req.body object will contain values of any type instead of just strings.
const bcrypt= require('bcrypt')

mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));
//The next step is to actually connect to our database. The connect function takes in our URL and has the facility to specify a callback function. It will be called when the connection is opened to the database. This gives us the opportunity to know if the database connection was successful or not.
// In the function, we are writing the string “MongoDb is connected” to the console to indicate that a successful connection was created.
//mongoose.connect => helps to connect
//useNewUrlParser: true => allow users to fall back to the old parser if they find a bug in the new parser.
//.then => fulfilled the promise
//.catch => catchs the connection releated errors

app.use("/", route);
//Used to create a new router object in our program to handle requests.

app.listen(process.env.PORT || 3001, function () {
  console.log("Express app running on port " + (process.env.PORT || 3001));
});
//We are making our entire Node.js application listen on port 3000.
