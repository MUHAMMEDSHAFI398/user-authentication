const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const citiesSchema = new Schema(
  {
    cityName: {
      type: String,
    },
  },
  { timestamps: true }
);

const cities = mongoose.model("cities", citiesSchema);
module.exports = cities