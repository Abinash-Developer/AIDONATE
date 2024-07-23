const mongoose = require("mongoose");
const State = require("../models/state");
const City = require("../models/city");
const state_city = require("./state_city.json");
mongoose
  .connect(
    "mongodb+srv://abinashupwork:05eW12AU4yobTR5u@cluster0.qhy1cum.mongodb.net/aidonate",
    {
      serverSelectionTimeoutMS: 300000,
      socketTimeoutMS: 450000,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const seedDB = async () => {
  await State.deleteMany({});
  await City.deleteMany({});

  for (const [stateName, cities] of Object.entries(state_city)) {
    const state = new State({ name: stateName });
    await state.save();

    for (const cityName of cities) {
      const city = new City({ name: cityName, state: state._id });
      await city.save();
    }
  }
};
seedDB().catch(console.error);
