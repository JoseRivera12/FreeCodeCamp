const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGO_URI;

//Conection to mongoDB
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("Mongodb is connected to", db.connection.host))
  .catch((err) => console.error(err));