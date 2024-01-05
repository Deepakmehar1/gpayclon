const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNum: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tPin: {
    type: Number,
    required: true,
  },
  availableAmound: {
    type: Number,
    default:0.00
  },
  transection: [{ type: ObjectId, ref: "Transection" }],
});

mongoose.model("User", userSchema);
