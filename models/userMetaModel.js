const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userMetaSchema = new Schema({
  meta_id: {
    type: Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },
  meta_key:{
   type:String,
   required:true,
  },
  meta_value:{
    type:String,
    required:true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("user_meta", userMetaSchema);
