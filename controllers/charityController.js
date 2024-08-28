const mongoose = require("mongoose");
const User = require("../models/userModel");

const State = require("../models/state");
const City = require("../models/city");
const userMetaModel = require("../models/userMetaModel");
const getAllCharity = async (req, res) => {
  try {
    const ngos = await User.find({ role: "ngo" })
      .populate("state")
      .populate("district");
    res.render("admin/charity/charity", {
      ngoresult: ngos,
      currentRoute: "charity",
    });
  } catch (error) {
    console.log(error);
  }
};
const deactivateCharity = async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.params.id },
      { $set: { status: "inactive" } }
    );
    res.json({ message: "Charity deactivated successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};
const activateCharity = async (req, res) => {
  try {
    await User.updateOne(
      { _id: req.params.id },
      { $set: { status: "active" } }
    );
    res.json({ message: "Charity deactivated successfully", success: true });
  } catch (error) {
    console.log(error);
  }
};
const fetchCategoryForEdit = async (req, res) => {
 const requiredMetaKeys = ['profile_image', 'description', 'goal'];
  try {
    const charity = await User.findOne({ _id: req.params.id }).lean();;
    if (!charity) {
      return res.status(404).json({ message: "User not found" });
    }
    const userMetaDocs = await userMetaModel.find({
      meta_id: req.params.id,
      meta_key: { $in: requiredMetaKeys }
    });
    charity.metaData = userMetaDocs;
    const state = await State.find({});
    const city = await City.find({ state: charity.state });
    res.render("admin/charity/editCharity", {
      charity: charity,
      state: state,
      city: city,
      currentRoute: "charity",
    });
  } catch (error) {
    console.log(error);
  }
};
const getCity = async (req, res) => {
  try {
    const city = await City.find({ state: req.params.id });
    res.status(200).json({
      status: "success",
      city,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateCharity = async (req, res) => {
    console.log(req.file);
  const updateUser = await User.updateOne(
    { _id: req.body.id },
    {
      $set: {
        ngogovtId: req.body.ngoid,
        ngoname: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phone,
        state: req.body.state,
        district: req.body.city,
        pincode: req.body.pincode,
      },
    }
  );
  await userMetaModel.updateOne(
    { meta_id: req.body.id, meta_key: "goal" },
    { $set: { meta_value: req.body.goal } },
    { upsert: true }
  );
  await userMetaModel.updateOne(
    { meta_id: req.body.id, meta_key: "description" },
    { $set: { meta_value: req.body.description } },
    { upsert: true }
  );
  await userMetaModel.updateOne(
    { meta_id: req.body.id, meta_key: "profile_image" },
    { $set: { meta_value: req.file.filename } },
    { upsert: true }
  );

    res.json({
      status: "success",
      message: "User updated successfully",
      data: updateUser,
    });

};
module.exports = {
  getAllCharity,
  deactivateCharity,
  activateCharity,
  fetchCategoryForEdit,
  getCity,
  updateCharity,
};
