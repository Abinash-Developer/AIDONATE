const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CitySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  state: {
    type: Schema.Types.ObjectId,
    ref: "state",
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("city", CitySchema);
