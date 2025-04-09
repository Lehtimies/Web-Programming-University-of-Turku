const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI
if (!url) {
  console.error("MONGODB_URI is not defined in .env file")
  process.exit(1);
}

mongoose.connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

const citySchema = new mongoose.Schema({
  name: String,
  lon: Number,
  lat: Number,
})

citySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
})

module.exports = mongoose.model("City", citySchema);