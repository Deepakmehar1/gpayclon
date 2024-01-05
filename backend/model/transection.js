const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const transectionSchema = new mongoose.Schema({
  sender: { type: ObjectId, ref: "User" },
  recever: { type: ObjectId, ref: "User" },
  amount: {
    type: String,
    require: true,
  },
  date:{type:Date, default:Date.now}
});

mongoose.model("Transection", transectionSchema);
