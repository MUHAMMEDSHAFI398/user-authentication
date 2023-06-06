const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: mongoose.SchemaTypes.ObjectId,
      ref:'cities'
    },
    password:{
        type:String,
        trim:true
    }

  },
  { timestamps: true }
);

const user = mongoose.model("user", userSchema);
module.exports = user